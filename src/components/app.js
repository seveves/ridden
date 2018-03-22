import { h, Component } from 'preact';
import { Router, route } from 'preact-router';
import { SlotProvider, Slot } from 'preact-slots';

import { bus } from '../utils';
import { getUser } from '../utils/local';

import Header from './header';

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

	isVendor = user => {
		if (!user) {
			return false;
		}
		return user.roles.some(r => r === 'vendor') && user.vendorId && user.vendorId.length > 0;
	}

	render({ }, { user }) {
		return (
			<SlotProvider>
				<div id="app">
					<Slot name="modal"></Slot>
					<Header user={user} isVendor={this.isVendor(user)}/>
					<div class="container">
						<Router onChange={this.handleRoute}>
							<Home path="/" />
							<Bookings path="/bookings" user={user} />
							<ShuttleDetails path="/shuttle-details/:id" user={user} isVendor={this.isVendor}/>
							<ShuttleOffers path="/offers" user={user} isVendor={this.isVendor(user)}/>
							<CreateEditShuttle path="/offer-details/:id?" user={user} isVendor={this.isVendor(user)}/>
							<Fleet path="/fleet" user={user} isVendor={this.isVendor(user)}/>
							<CreateEditCar path="/fleet-details/:id?" user={user} isVendor={this.isVendor(user)}/>
							<Login path="/login/:token?" />
						</Router>
					</div>
				</div>
			</SlotProvider>
		);
	}
}
