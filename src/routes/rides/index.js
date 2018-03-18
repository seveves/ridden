import { h, Component } from 'preact';
import style from './style';
import { get } from '../../api';

import { RidesList } from '../../components/rides-list';
import DistancePicker from '../../components/distance-picker';

export default class Rides extends Component {

	state = { rides: null, distance: 100, lat: 48.596603, lon: 9.414554 };
	
	findRides() {
		const param = `?near=${this.state.distance}:${this.state.lat}:${this.state.lon}`;
		get('rides' + param).then(res => res.data).then(rides => {
			this.setState({ rides	});
		});
	}

	updateDistance(distance) {
		this.setState({ distance }, () => {
			this.findRides();
		});
	}
	
	componentDidMount() {
		navigator.geolocation.getCurrentPosition((position) => {
			this.setState({
				lat: position.coords.latitude,
				lon: position.coords.longitude,
				distance: this.state.distance
			}, () => {
				this.findRides();
			});
		});
	}

	render({ }, { rides, lat, lon }) {
		return (
			<div class={style['locate-rides']}>
				<h1 class="title margin-top">find</h1>
				<p class="sub-title">showing rides near you</p>
				<DistancePicker onUpdateDistance={this.findRides} />
				<RidesList rides={rides} />
			</div>
		);
	}
}
