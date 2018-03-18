import { h, Component } from 'preact';
import { Router, route } from 'preact-router';

import { bus } from '../utils';
import { getUser } from '../utils/local';

import Header from './header';

import Home from '../routes/home';
import Bookings from '../routes/bookings';
import Login from '../routes/login';

function nextUrl(uri, isUser) {
	const isLogin = uri.indexOf('/login') !== -1;
	if (!isUser && !isLogin) return '/login';
	return uri;
}

export default class App extends Component {

	state = { user: getUser() };

	handleRoute = e => {
		const currentUrl = e.url;
		const next = nextUrl(currentUrl, !!this.state.user);
		if (next !== currentUrl) {
			return route(next, true);
		}
	};

	componentDidMount() {
		bus.on('auth:change', obj => {
			this.setState({ user: obj }, () => obj ? route('/') : route('/login'));
		});
	}

	render({ }, { user }) {
		return (
			<div id="app">
				<Header user={user} />
				<div class="container">
					<Router onChange={this.handleRoute}>
						<Home path="/" />
						<Bookings path="/bookings" user={user} />
						<Login path="/login/:token?" />
					</Router>
				</div>
			</div>
		);
	}
}
