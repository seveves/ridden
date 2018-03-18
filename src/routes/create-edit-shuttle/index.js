import { h, Component } from 'preact';
import style from './style';
import { get, post, put } from '../../api';

export default class CreateEditShuttle extends Component {

	state = {
		title: '',
		description: '',
		languages: [],
		duration: 0,
		lat: 48.596603,
		lon: 9.414554,
		availableSeats: 10,
		leftSeats: 10,
		takingOff: new Date().toISOString()
	};

	handleChange = e => {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		this.setState({ [name]: value });
	}

	handleSubmit = ev => {
		ev.preventDefault();
		if (this.props.id) {
			put(`shuttles/${this.props.id}`, this.state).then(() => history.back());
		}
		else {
			post('shuttles', this.state).then(() => history.back());
		}
	}

	componentDidMount() {
		if (this.props.id) {
			get(`shuttles/${this.props.id}`)
				.then(shuttle => {
					this.setState({
						title: shuttle.title,
						description: shuttle.description,
						languages: shuttle.languages,
						duration: shuttle.duration,
						lat: shuttle.lat,
						lon: shuttle.lon,
						availableSeats: shuttle.availableSeats,
						leftSeats: shuttle.leftSeats,
						takingOff: shuttle.takingOff
					});
				});
		}
	}

	render({ id }, state) {
		return (
			<div class={style['create-edit-shuttle'] + ' margin-top'}>
				<h1 class="title">{id ? 'edit ride' : 'create new ride'}</h1>
				<form onSubmit={this.handleSubmit}>
					<div>
						<label>Title</label>
						<input type="text" value={state.title} name="title" onChange={this.handleChange} />
					</div>
					<div>
						<label>Description</label>
						<textarea rows="8" value={state.description} name="description" onChange={this.handleChange} />
					</div>
					<div>
						<label>Duration</label>
						<input type="number" value={state.duration} name="duration" onChange={this.handleChange} />
					</div>
					<div>
						<label>Available Seats</label>
						<input type="number" value={state.availableSeats} name="availableSeats" onChange={this.handleChange} />
					</div>
					<div>
						<label>Taking off</label>
						<input type="text" value={state.takingOff} name="takingOff" onChange={this.handleChange} />
					</div>
					<div>
						<label>Location</label>
						<div>
							<input type="number" step="any" value={state.lat} name="lat" onChange={this.handleChange} />
							<input type="number" step="any" value={state.lon} name="lon" onChange={this.handleChange} />
						</div>
					</div>
					<input type="submit" value={id ? 'save' : 'create'} />
				</form>
			</div>
		);
	}
}
