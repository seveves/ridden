import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Header from './header';

import Home from '../routes/home';
import Login from '../routes/login';
import Rides from '../routes/rides';
import Hops from '../routes/hops';
import Shuttles from '../routes/shuttles';
import ShuttleDetails from '../routes/shuttle-details';
import CreateEditShuttle from '../routes/create-edit-shuttle';

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
					<Hops path="/hops" />
					<Rides path="/rides" />
					<Shuttles path="/shuttles/" />
					<ShuttleDetails path="/shuttles/details/:id" />
					<CreateEditShuttle path="/shuttle/create" />
					<CreateEditShuttle path="/shuttle/edit/:id" />
				</Router>
			</div>
		);
	}
}
