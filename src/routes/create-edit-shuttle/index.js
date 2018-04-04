import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import { SlotContent } from 'preact-slots';
import { connect } from 'unistore/preact';
import { actions } from '../../store';

import ModalPopup from '../../components/modal-popup';
import DatePicker from '../../components/date-picker';

@connect(['offer', 'cars'], actions)
export default class CreateEditShuttleOffer extends Component {

	state = {
		form: {
			title: '',
			description: '',
			type: 'OneWay',
			duration: 2,
			max: 10,
			min: 2,
			carId: null
		},
		departure: new Date(),
		location: {
			name: '',
			long: 10,
			lat: 10
		},
		showConfirm: false
	};

	handleChange = e => {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		const max = name === 'carId' && this.props.cars && this.props.cars.length > 0
			? this.props.cars.filter(c => c._id === value).map(c => c.max)[0]
			: this.state.form.max;
		this.setState({ form: { ...this.state.form, max, [name]: value } });
	}

	handleSubmit = ev => {
		ev.preventDefault();
		const shuttle = {
			...this.state.form,
			departure: this.state.departure.toISOString(),
			vendorId: this.props.user.vendorId
		};
		if (this.state.location) {
			shuttle['location'] = { ...this.state.location }
		}
		if (this.props.id) {
			this.props.updateOffer(this.props.id, shuttle);
		}
		else {
			this.props.createOffer(shuttle);
		}
	}

	handleDateChange = e => {
		if (e && e.length) {
			this.setState({ departure: e[0] });
		}
	}

	delete = ev => {
		ev.preventDefault();
		if (this.props.id) {
			this.setState({ showConfirm: false }, () => {
				this.props.deleteOffer(this.props.id);
			});
		} else {
			this.setState({ showConfirm: false });
		}
	}

	confirmDelete = ev => {
		ev.preventDefault();
		this.setState({ showConfirm: true });
	}

	closeModal = ev => {
		ev.preventDefault();
		this.setState({ showConfirm: false });
	}

	componentWillReceiveProps(props) {
		if (this.props.offer !== props.offer) {
			let carId = props.offer.carId;
			let max = 10;
			if (carId) {
				const car = this.props.cars.find(c => c._id === carId);
				if (car) {
					max = car.max;
				}
			} else {
				carId = this.props.cars[0]._id;
				max = this.props.cars[0].max;
			}
			this.setState({
				form: {
					max,
					carId,
					title: props.offer.title,
					description: props.offer.description,
					type: props.offer.type,
					duration: props.offer.duration,
					min: props.offer.min
				},
				location: {
					name: props.offer.location.name,
					long: props.offer.location.long,
					lat: props.offer.location.lat
				},
				departure: new Date(props.offer.departure)
			});
		}
	}

	componentDidMount() {
		this.props.getOffer(this.props.id);
	}

	render({ id, user, cars, offer, getOffer, createOffer, updateOffer, deleteOffer }, state) {
		return (
			<div>
				<div class="d-flex flex-row">
					<h1 class="page-title">{ id ? 'Shuttle Offer Details' : 'Create Shuttle Offer' }</h1>
					<Link class="ml-auto btn btn-default" href="/offers">Back</Link>
				</div>
				<form onSubmit={this.handleSubmit}>
					<div>
						<label>Title</label>
						<input type="text" value={state.form.title} name="title" onChange={this.handleChange} />
					</div>
					<div>
						<label>Departure</label>
						<DatePicker data-enable-time value={state.departure}
												onChange={this.handleDateChange} />
					</div>
					<div>
						<label>Description</label>
						<textarea rows="8" value={state.form.description} name="description" onChange={this.handleChange} />
					</div>
					<div>
						<label>Type</label>
						<select value={state.form.type} name="type" onChange={this.handleChange}>
							<option value="OneWay">One Way</option>
							<option value="FullDay">Full Day</option>
						</select>
					</div>
					<div>
						<label>Max</label>
						<input type="number" value={state.form.max} name="max" onChange={this.handleChange} disabled/>
					</div>
					<div>
						<label>Min</label>
						<input type="number" value={state.form.min} name="min" onChange={this.handleChange} />
					</div>
					<div>
						<label>Duration</label>
						<input type="number" value={state.form.duration} name="duration" onChange={this.handleChange} />
					</div>
					<div>
						<label>Car</label>
						<select value={state.form.carId} name="carId" onChange={this.handleChange}>
							{ cars.map(car => (<option value={car._id}>{car.name}</option>)) }
						</select>
					</div>
					<button class="btn btn-hero" type="submit">{ id ? 'Update' : 'Create'}</button>
				</form>
				{ id
					? 
						<div>
							<h3 class="extra-title">Extra actions</h3>
							<button class="btn btn-warn" onClick={this.confirmDelete}>Delete</button>
						</div>
					: null }
				{ state.showConfirm ? (
					<SlotContent slot="modal">
						<ModalPopup onClose={this.closeModal}>
							<h1>Delete shuttle</h1>
							<p>Do you really want to delete this shuttle?</p>
							<button class="btn btn-warn" onClick={this.delete}>Delete</button>
						</ModalPopup>
					</SlotContent>
				) : null }
			</div>
		);
	}
}
