import fetch from 'unfetch';
import jwtDecode from 'jwt-decode';
import filesaver from 'file-saver';
import { login as _login, logout as _logout, headers } from './auth';
import { getToken } from '../utils/local';

const API = API_URL;

function handle(r) {
	let act = r.ok ? 'resolve' : 'reject';
	return r.json().then(data => Promise[act](data));
}

function send(method, uri, data, opts) {
	opts = opts || {};
	opts.method = method;
	opts.headers = headers(opts || {});
	data && (opts.body = JSON.stringify(data));
	return fetch(`${API}/${uri}`, opts).then(handle);
}

export const get = send.bind(null, 'get');
export const put = send.bind(null, 'put');
export const patch = send.bind(null, 'patch');
export const post = send.bind(null, 'post');
export const del = send.bind(null, 'delete');

export function login(token) {
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
			filesaver.saveAs(blob, `${id}.ics`);
		});
}

export function logout() {
	return fetch(`${API}/logout`).then(() => _logout());
}