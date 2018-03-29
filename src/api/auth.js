import { bus, extend } from '../utils';
import { getToken, setToken, setUser } from '../utils/local';

let TOKEN = getToken();

const BASE = {
	'Content-Type': 'application/json;charset=UTF-8',
	Accept: 'application/json, text/plain, */*'
};

export function headers() {
	let obj = extend({}, BASE);
	TOKEN && extend(obj, { Authorization: `Bearer ${TOKEN}` });
	return obj;
}

export function login(accessToken, user) {
	return new Promise((resolve, reject) => {
		setToken(TOKEN=accessToken);
		setUser(user);
		resolve(user);
	});
}

export function logout() {
	return new Promise((resolve, reject) => {
		setToken(false);
		setUser(false);
		resolve();
	});
}