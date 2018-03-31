import { h, Component } from 'preact';
import { connect } from 'unistore/preact';
import { actions } from '../../store';

import { ShuttlesList } from '../../components/shuttles-list';
import DistancePicker from '../../components/distance-picker';

@connect('shuttles', actions)
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
		this.props.getShuttles(param);
	}

	updateDistance(distance) {
		this.setState({ distance }, () => {
			this.getShuttles();
		});
	}

	componentDidMount() {
		this.getShuttles();
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

	render({ shuttles, getShuttles }, { geo }) {
		return (
			<div>
				<h1 class="page-title">Shuttles</h1>
				<div>
					{ geo ? <DistancePicker onUpdateDistance={(distance) => this.updateDistance(distance)} /> : null }
				</div>
				<ShuttlesList shuttles={shuttles}></ShuttlesList>
			</div>
		);
	}
}
