import { h, Component } from 'preact';
import style from './style';

import RidesList from '../../components/rides-list';
import DistancePicker from '../../components/distance-picker';

import * as geo from '../../utils/geo';

const API_ORIGIN = 'http://192.168.0.185:3000';

export default class FindRides extends Component {

	state = { rides: null, distance: 100, position: {} };
	
	locateRides(position, distance) {
    this.setState({ rides: null });
    fetch(`${API_ORIGIN}/rides`)
      .then(r => r.json())
      .then(rides => rides.filter(ride => distance >= geo.getDistanceBetweenInKm(
				ride.location,
				{ lat: position.coords.latitude, long: position.coords.longitude })))
			.then(rides => {
        this.setState({ rides, position: {
          coords: { latitude: position.coords.latitude, longitude: position.coords.longitude }}, distance });
      });
	}
	
	componentDidMount() {
		const distance = this.state.distance;
		navigator.geolocation.getCurrentPosition((position) => this.locateRides(position, distance))
	}

	render({ }, { rides, distance, position }) {
		return (
			<div class={style['locate-rides']}>
				<h1 class="title margin-top">locate rides near you</h1>
				<p class="sub-title">showing rides near you</p>
				<DistancePicker onUpdateDistance={(update) => this.locateRides(position, update)} />
				<RidesList rides={rides} />
			</div>
		);
	}
}
