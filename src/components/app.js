import { h, Component } from 'preact';
import { Router, route } from 'preact-router';

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

const noAuth = ['/app/login'];
const toAuth = ['/app/hops', '/app/rides', '/app/shuttles', '/app/shuttles/details', '/app/shuttles/create', '/app/shuttles/edit'];
const showBack = ['/app/shuttles/details', '/app/shuttles/create', '/app/shuttles/edit']

function nextUrl(uri, isUser) {
	const path = getPath(uri);  
  if (isUser && noAuth.indexOf(path) !== -1) return '/';
  if (!isUser && toAuth.indexOf(path) !== -1) return noAuth[0];
  return uri;
}

function showBackButton(uri) {
	const path = getPath(uri);
	return showBack.indexOf(path) !== -1;
}

function getPath(uri) {
	let paths = uri.split('/');
	let path = '/' + paths[1];
	if (paths.length > 2) {
		path = path.concat('/', paths[2]);
	}
	if (paths.length > 3) {
		path = path.concat('/', paths[3]);
	}
	return path;
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
					<Router onChange={this.handleRoute}>
						<Home path="/" />
						<Login path="/app/login" />
						<Hops path="/app/hops" user={user}/>
						<Rides path="/app/rides" />
						<Shuttles path="/app/shuttles" />
						<ShuttleDetails path="/app/shuttles/details/:id" user={user} />
						<CreateEditShuttle path="/app/shuttles/create" />
						<CreateEditShuttle path="/app/shuttles/edit/:id" />
					</Router>
				</div>
			</div>
		);
	}
}
