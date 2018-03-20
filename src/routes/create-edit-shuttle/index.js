import { h, Component } from 'preact';
import Portal from 'preact-portal';

import { get, post, put, del } from '../../api';

import ModalPopup from '../../components/modal-popup';

export default class CreateEditShuttleOffer extends Component {

	state = {
		form: {
			departure: new Date().toISOString(),
			title: '',
			description: '',
			type: 'OneWay',
			duration: 2,
			max: 10,
			min: 2,
			carId: null
		},
		location: {
			name: '',
			long: 10,
			lat: 10
		},
		cars: [],
		showConfirm: false
	};

	handleChange = e => {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		this.setState({ form: { ...this.state.form, [name]: value } });
	}

	handleSubmit = ev => {
		ev.preventDefault();
		const shuttle = {
			...this.state.form,
			vendorId: this.props.user.vendorId
		};
		if (this.state.location) {
			shuttle['location'] = { ...this.state.location }
		}
		if (this.props.id) {
			put(`shuttles/${this.props.id}`, shuttle).then(() => console.log('updated'));
		}
		else {
			post('shuttles', shuttle).then(() => history.back());
		}
	}

	delete = ev => {
		ev.preventDefault();
		if (this.props.id) {
			this.setState({ showConfirm: false }, () => {
				del(`shuttles/${this.props.id}`).then(() => history.back());
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

	componentDidMount() {
		if (this.props.id) {
			get(`vendors/${this.props.user.vendorId}/cars`)
				.then(cars => {
					get(`shuttles/${this.props.id}`)
						.then(shuttle => {
							this.setState({
								cars: cars,
								form: {
									departure: shuttle.departure,
									title: shuttle.title,
									description: shuttle.description,
									type: shuttle.type,
									duration: shuttle.duration,
									max: shuttle.max,
									min: shuttle.min,
									carId: shuttle.carId
								},
								location: shuttle.location
						});
					});
				});
		} else {
			get(`vendors/${this.props.user.vendorId}/cars`)
				.then(cars => {
					if (cars.length > 0) {
						this.setState({ cars, form: { ...this.state.form, carId: cars[0]._id } });
					}
				});
		}
	}

	render({ id, user, isVendor }, state) {
		return (
			<div class="margin-top">
				<h1 class="title">{ id ? 'details' : 'create' }</h1>
				{ id ? <button onClick={this.confirmDelete}>delete</button> : null }
				<form onSubmit={this.handleSubmit}>
					<div>
						<label>Title</label>
						<input type="text" value={state.form.title} name="title" onChange={this.handleChange} />
					</div>
					<div>
						<label>Date</label>
						<input type="datetime" value={state.form.departure} name="departure" onChange={this.handleChange} />
					</div>
					<div>
						<label>Description</label>
						<textarea rows="8" value={state.form.description} name="description" onChange={this.handleChange} />
					</div>
					<div>
						<label>Type</label>
						<input type="text" value={state.form.type} name="type" onChange={this.handleChange} />
					</div>
					<div>
						<label>Max</label>
						<input type="number" value={state.form.max} name="max" onChange={this.handleChange} />
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
						<select value={state.form.carId} name="carId" onChange={this.handleChange}>
							{ state.cars.map(car => (<option value={car._id}>{car.name}</option>)) }
						</select>
					</div>
					<input type="submit" value={id ? 'save' : 'create'} />
				</form>
				{ state.showConfirm ? (
					<Portal into="body">
						<ModalPopup onClose={this.closeModal}>
							<h1>Delete shuttle</h1>
							<p>Do you really want to delete this shuttle?</p>
							<button onClick={this.delete}>Delete</button>
						</ModalPopup>
					</Portal>
				) : null }
			</div>
		);
	}
}
