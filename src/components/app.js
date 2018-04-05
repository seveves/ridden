import { h, Component } from 'preact';
import { Router, route } from 'preact-router';
import { SlotProvider, Slot } from 'preact-slots';
import { connect } from 'unistore/preact';

import { bus } from '../utils';
import { actions } from '../store';

import Header from './header';
import AlertToaster from './alert-toaster';

import Home from '../routes/home';
import Bookings from '../routes/bookings';
import ShuttleOffers from '../routes/shuttle-offers';
import ShuttleDetails from '../routes/shuttle-details';
import CreateEditCar from '../routes/create-edit-car';
import CreateEditShuttle from '../routes/create-edit-shuttle';
import Fleet from '../routes/fleet';
import Login from '../routes/login';

function nextUrl(uri, isUser) {
	const isLogin = uri.indexOf('/login') !== -1;
	if (!isUser && !isLogin) return '/login';
	return uri;
}

@connect('user', actions)
export default class App extends Component {

	componentDidUpdate() {
		if (this.props.user) {
			route('/');
		}
	}

	handleRoute = e => {
		bus.emit('route:change', e);
		const currentUrl = e.url;
		const next = nextUrl(currentUrl, !!this.props.user);
		if (next !== currentUrl) {
			return route(next, true);
		}
	};

	render({ user, logout }) {
		return (
			<SlotProvider>
				<div id="app">
					<Slot name="modal"></Slot>
					<Header user={user} logout={logout} />
					<AlertToaster />
					<div class="container">
						<Router onChange={this.handleRoute}>
							<Home path="/" />
							<Bookings path="/bookings" user={user} />
							<ShuttleDetails path="/shuttle-details/:id" backTo="/" user={user} />
							<ShuttleDetails path="/bookings/:id" backTo="/bookings" user={user} />
							<ShuttleOffers path="/offers" user={user} />
							<CreateEditShuttle path="/offer-details/:id?" user={user} />
							<Fleet path="/fleet" user={user} />
							<CreateEditCar path="/fleet-details/:id?" user={user} />
							<Login path="/login/:token?" />
						</Router>
					</div>
				</div>
			</SlotProvider>
		);
	}
}
