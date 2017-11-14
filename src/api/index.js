import fetch from 'unfetch';
import { headers } from './auth';
import { login as _login } from './auth';
import jwtDecode from 'jwt-decode';

const API= 'http://localhost:3030';

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

export function login(data) {
  data.user.strategy = 'local';
  return post('authentication', data.user)
    .then(res => ({ id: jwtDecode(res.accessToken).userId, accessToken: res.accessToken }))
    .then(info => {
      const opts = {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Accept': 'application/json, text/plain, */*',
          'Authorization': `Bearer ${info.accessToken}`
        }
      };
      return fetch(`${API}/users/${info.id}`, opts)
              .then(handle)
              .then(user => ({ user: user, accessToken: info.accessToken }));
    })
    .then(info => _login(info.accessToken, info.user));
}