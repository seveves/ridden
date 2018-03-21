import { h, Component } from 'preact';
import { get } from '../../api';

import { ShuttlesList } from '../../components/shuttles-list';
import DistancePicker from '../../components/distance-picker';

export default class Home extends Component {

	state = {
		shuttles: null,
		distance: 100,
		lat: 48.596603,
		lon: 9.414554,
		geo: false
	};

	getShuttles() {
		const param = this.state.geo ? `?near=${this.state.distance}:${this.state.lat}:${this.state.lon}` : '';
		get(`shuttles${param}`).then(shuttles => {
			this.setState({ shuttles });
		});
	}

	updateDistance(distance) {
		this.setState({ distance }, () => {
			this.getShuttles();
		});
	}

	componentDidMount() {
		navigator.geolocation.getCurrentPosition((position) => {
			this.setState({
				lat: position.coords.latitude,
				lon: position.coords.longitude,
				distance: this.state.distance,
				geo: true
			}, () => {
				this.getShuttles();
			});
		}, (err) => {
			this.setState({
				geo: false,
			}, () => {
				this.getShuttles();
			});
		});
	}

	render({}, { shuttles, geo }) {
		return (
			<div>
				<h1 class="page-title d-flex aic">Shuttles</h1>
				{ geo ? <DistancePicker onUpdateDistance={(distance) => this.updateDistance(distance)} /> : null }
				<ShuttlesList shuttles={shuttles}></ShuttlesList>
			</div>
		);
	}
}
