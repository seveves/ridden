import fetch from 'unfetch';
import jwtDecode from 'jwt-decode';
import filesaver from 'file-saver';
import { route } from 'preact-router';
import { login as _login, logout as _logout, headers } from './auth';
import { bus } from '../utils';
import { getToken } from '../utils/local';
import { store } from '../store';

const API = API_URL;
let counter = 0;

function handle(r) {
	let act = r.ok ? 'resolve' : 'reject';
	if (!--counter) {
		bus.emit('network:loadend');
	}
	return r.json().then(data => {
		if (data.error) {
			if (data.error.name === 'JsonWebTokenError' || data.error.name === 'NoAuthorizationHeader') {
				bus.emit('alert:new', { type: 'fail', title: 'Session expired', message: 'Please login again.', dismissable: true });
				return logout().then(() => {
					store.setState({ user: null });
					route('/login', true);
				});
			}
		}
		return Promise[act](data);
	});
}

function send(method, uri, data, opts) {
	if (!counter++) {
		bus.emit('network:loadstart');
	}
	opts = opts || {};
	opts.method = method;
	opts.headers = headers(opts || {});
	data && (opts.body = JSON.stringify(data));
	return fetch(`${API}/${uri}`, opts)
		.then(handle)
		.catch(err => {
			if (!--counter) {
				bus.emit('network:loadend');
			}
			return Promise.reject(err);
		});
}

export const get = send.bind(null, 'get');
export const put = send.bind(null, 'put');
export const patch = send.bind(null, 'patch');
export const post = send.bind(null, 'post');
export const del = send.bind(null, 'delete');

export function login(token) {
	if (!counter++) {
		bus.emit('network:loadstart');
	}
	const decoded = jwtDecode(token);
	const opts = {
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json;charset=UTF-8',
			Accept: 'application/json, text/plain, */*'
		}
	};
	return fetch(`${API}/riders/${decoded.data.id}`, opts)
		.then(handle)
		.then(rider => _login(token, rider));
}

export function saveIcs(id) {
	const token = getToken();
	const opts = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	};
	return fetch(`${API}/shuttles/${id}/ical`, opts)
		.then(res => res.text())
		.then(icsText => {
			const blob = new Blob([icsText], {type: "text/calendar;charset=utf-8"});
			filesaver.saveAs(blob, `${id}.ics`, true);
		});
}

export function logout() {
	return fetch(`${API}/logout`).then(() => _logout());
}