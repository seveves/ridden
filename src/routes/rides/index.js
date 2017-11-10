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

	render({ }, { rides }) {
		return (
			<div class={style.rides}>
				<h1 class="title margin-top">rides</h1>
				<p class="sub-title">showing all available rides</p>
				<RidesList rides={rides} />
			</div>
		);
	}
}
