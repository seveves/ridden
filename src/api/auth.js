import fetch from 'unfetch';
import { bus, extend } from '../utils';
import { getToken, setToken, setUser } from '../utils/local';

let TOKEN = getToken();

const BASE = {
	'Content-Type': 'application/json;charset=UTF-8',
	'Accept': 'application/json, text/plain, */*'
};

export function headers() {
	let obj = extend({}, BASE);
	TOKEN && extend(obj, { Authorization:`Bearer ${TOKEN}` });
	return obj;
}

export function login(accessToken, user) {
	console.log('> user', user);
	setToken(TOKEN=accessToken);
	setUser(user);
	bus.emit('auth:change', user);
}

export function logout() {
	bus.emit('auth:change', false);
	setToken(false);
	setUser(false);
}