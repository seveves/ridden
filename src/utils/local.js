const STORE = localStorage;
const NAMESPACE = 'ridden';

function getItem(key) {
	let val = STORE.getItem(`${NAMESPACE}:${key}`);
	return JSON.parse(val || false);
}

function setItem(key, val) {
	key = `${NAMESPACE}:${key}`;
	val ? STORE.setItem(key, JSON.stringify(val)) : STORE.removeItem(key);
}

export function getToken() {
	return getItem('token');
}

export function setToken(str) {
	setItem('token', str);
}

export function getUser() {
	const user = getItem('user');
	if (user) {
		user.isVendor = user.roles.some(r => r === 'vendor') && user.vendorId && user.vendorId.length > 0;
	}
	return user;
}

export function setUser(obj) {
	setItem('user', obj);
}