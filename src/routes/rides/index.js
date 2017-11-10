import { h, Component } from 'preact';
import style from './style';
import RidesList from '../../components/rides-list';

const API_ORIGIN = 'http://192.168.0.185:3000';

export default class Rides extends Component {

	state = { rides: null };
	
	loadRides() {
		fetch(`${API_ORIGIN}/rides`)
			.then(r => r.json())
			.then(rides => this.setState({ rides }));
	}
	
	componentDidMount() {
		this.loadRides();
	}

	deleteRide = id => {
		if (confirm('delete this ride?')) {
			const headers = new Headers({ 'Content-Type': 'application/json' });
			const postInit = {
				method: 'DELETE',
				headers
			};
			fetch(`${API_ORIGIN}/rides/` + id, postInit)
				.then(() => this.loadRides());
		}
	}

	render({ }, { rides }) {
		return (
			<div class={style.rides}>
				<h1 class="title margin-top">rides</h1>
				<p class="sub-title">showing all available rides</p>
				<RidesList rides={rides} onDelete={this.deleteRide}/>
				<div class="fab-container"> 
					<a href="/create">create</a>
				</div>
			</div>
		);
	}
}
