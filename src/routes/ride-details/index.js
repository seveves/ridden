import { h, Component } from 'preact';
import style from './style';

const API_ORIGIN = 'http://192.168.0.185:3000';

export default class RideDetails extends Component {

	state = { ride: undefined, showModal: false };

	loadRide() {
		fetch(`${API_ORIGIN}/rides/${this.props.id}`)
			.then(r => r.json())
			.then(ride => this.setState({ ride }));
	}

	isOnThisRide(ride) {
		return ride.seats.left < ride.seats.available;
	}

	hopOn(ride) {
		const headers = new Headers({ 'Content-Type': 'application/json' });
		const putInit = {
			method: 'PUT',
			headers,
			body: JSON.stringify({
				...ride,
				seats: { ...ride.seats, left: ride.seats.left + 1 }
			})
		};
		fetch(`${API_ORIGIN}/rides/${this.props.id}`, putInit)
			.then(r => r.json())
			.then(ride => this.setState({ ride })); 
	}

	hopOff(ride) {
		const headers = new Headers({ 'Content-Type': 'application/json' });
		const putInit = {
			method: 'PUT',
			headers,
			body: JSON.stringify({
				...ride,
				seats: { ...ride.seats, left: ride.seats.left - 1 }
			})
		};
		fetch(`${API_ORIGIN}/rides/${this.props.id}`, putInit)
			.then(r => r.json())
			.then(ride => this.setState({ ride })); 
	}

	componentDidMount() {
		this.loadRide(this.props.id);
	}

	render({ id }, { ride }) {
		if (ride) {
			return (
				<div class={style['ride-details'] + ' margin-top'}>
					<h1 class="title">{ride.title}</h1>
					<p class="sub-title">Starting on {new Date(ride.starting_at).toLocaleTimeString()} at {new Date(ride.starting_at).toLocaleDateString()}</p>
					<h3>description</h3>
					<p class={style['desc']}>{ride.description}</p>
					<h3>available seats</h3>
					<p class={style['desc']}>{ride.seats.left} of {ride.seats.available}</p>
					<div class={style['fab-container']}> 
						{ this.isOnThisRide(ride)
								? <button onClick={() => this.hopOn(ride)}>Hop on</button>
								: <button onClick={() => this.hopOff(ride)}>Hop off</button> }
						<a href={`https://www.google.com/maps/dir/?api=1&destination=${ride.location.lat},${ride.location.long}`}>Navigate</a>
						<a href={'/edit/' + id}>Edit</a>
					</div>
				</div>
			);
		} else {
			return (
				<div>Loading ...</div>
			)
		}
	}
}