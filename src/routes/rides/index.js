import { h, Component } from 'preact';
import style from './style';
import { get } from '../../api';

import RidesList from '../../components/rides-list';
import DistancePicker from '../../components/distance-picker';

export default class Rides extends Component {

	state = { rides: null, distance: 100, lat: 48.596603, lon: 9.414554 };
	
	findRides(lat, lon, distance) {
		const param = `?near=${distance || state.distance}:${lat || state.lat}:${lon || state.lon}`;
		get('rides' + param).then(res => res.data).then(rides => {
			this.setState({ rides, lat, lon, distance	});
		});
	}
	
	componentDidMount() {
		const distance = this.state.distance;
		navigator.geolocation.getCurrentPosition((position) => {
			this.findRides(position.coords.latitude, position.coords.longitude, distance);
		});
	}

	render({ }, { rides, lat, lon }) {
		return (
			<div class={style['locate-rides']}>
				<h1 class="title margin-top">find</h1>
				<p class="sub-title">showing rides near you</p>
				<DistancePicker onUpdateDistance={(distance) => this.findRides(lat, lon, distance)} />
				<RidesList rides={rides} />
			</div>
		);
	}
}
