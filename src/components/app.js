import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Header from './header';

import Home from '../routes/home';
import Login from '../routes/login';
import Rides from '../routes/rides';
import FindRides from '../routes/find-rides';
import RideDetails from '../routes/ride-details';
import CreateEditRide from '../routes/create-edit-ride';

export default class App extends Component {

	state = { showBack: false, authed: true };

	handleRoute = e => {
		this.currentUrl = e.url;
		this.setState({
			showBack: e.url.startsWith('/details') ||
								e.url.startsWith('/create') ||
								e.url.startsWith('/edit') });
	};

	render({ }, { showBack, authed }) {
		return (
			<div id="app">
				<Header showBack={showBack} authed={authed}/>
				<Router onChange={this.handleRoute}>
					<Home path="/" />
					<Login path="/login" />
					<Rides path="/rides" />
					<FindRides path="/find-rides" />
					<RideDetails path="/details/:id" />
					<CreateEditRide path="/create" />
					<CreateEditRide path="/edit/:id" />
				</Router>
			</div>
		);
	}
}
