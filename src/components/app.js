import { h, Component } from 'preact';
import { Router, route } from 'preact-router';
import { createHashHistory } from 'history';

import { bus } from '../utils';
import { getUser } from '../utils/local';
import { getRoles } from '../api';

import Header from './header';

import Home from '../routes/home';
import Login from '../routes/login';
import Rides from '../routes/rides';
import Hops from '../routes/hops';
import Shuttles from '../routes/shuttles';
import ShuttleDetails from '../routes/shuttle-details';
import CreateEditShuttle from '../routes/create-edit-shuttle';

const history = createHashHistory();

const noAuth = ['/login'];
const toAuth = ['/hops', '/rides', '/shuttles', '/shuttles/details', '/shuttles/create', '/shuttles/edit'];
const showBack = ['/shuttles/details', '/shuttles/create', '/shuttles/edit']

function nextUrl(uri, isUser) {
  let paths = uri.split('/');
	let path = '/' + paths[1];
	if (paths.length > 2) {
		path = path.concat('/', paths[2]);
	}
  if (isUser && noAuth.indexOf(path) !== -1) return '/';
  if (!isUser && toAuth.indexOf(path) !== -1) return noAuth[0];
  return uri;
}

function showBackButton(uri) {
	let paths = uri.split('/');
	let path = '/' + paths[1];
	if (paths.length > 2) {
		path = path.concat('/', paths[2]);
	}
	return showBack.indexOf(path) !== -1;
}

export default class App extends Component {

	state = { showBack: false, user: getUser() };

	handleRoute = e => {
		const currentUrl = e.url;
		this.setState({ showBack: showBackButton(currentUrl) });
		const next = nextUrl(currentUrl, !!this.state.user);
		if (next !== currentUrl) {
			return route(next, true);
		}
	};

	componentDidMount() {
		bus.on('auth:change', obj => {
			this.setState({ user: obj}, () => obj ? route('/') : route(noAuth[0]));
		});
	}

	render({ }, { showBack, user }) {
		return (
			<div id="app">
				<Header showBack={showBack} user={user}/>
				<div class="container">
					<Router history={history} onChange={this.handleRoute}>
						<Home path="/" />
						<Login path="/login" />
						<Hops path="/hops" />
						<Rides path="/rides" />
						<Shuttles path="/shuttles" />
						<ShuttleDetails path="/shuttles/details/:id" />
						<CreateEditShuttle path="/shuttles/create" />
						<CreateEditShuttle path="/shuttles/edit/:id" />
					</Router>
				</div>
			</div>
		);
	}
}
