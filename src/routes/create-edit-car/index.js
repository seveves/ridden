import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import { SlotContent } from 'preact-slots';
import { connect } from 'unistore/preact';
import { actions } from '../../store';

import ModalPopup from '../../components/modal-popup';

@connect(['car', 'offers'], actions)
export default class CreateEditCar extends Component {

	state = {
		form: {
			max: 10,
			name: '',
			description: ''
		},
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
		if (this.props.id) {
			this.props.updateCar(this.props.id, { ...this.state.form });
		}
		else {
			this.props.createCar({ ...this.state.form });
		}
	}

	delete = ev => {
		ev.preventDefault();
		if (this.props.id) {
			this.setState({ showConfirm: false }, () => {
				this.props.deleteCar(this.props.id);
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
		if (props.car && this.props.car !== props.car) {
			this.setState({
				form: {
					max: props.car.max,
					name: props.car.name,
					description: props.car.description
				}
			});
		}
	}

	componentDidMount() {
		this.props.getCar(this.props.id);
	}

	render({ id, user, car, offers, getCar, deleteCar, updateCar, createCar }, state) {
		return (
			<div>
				<div class="d-flex flex-row">
					<h1 class="page-title">{ id ? 'Car Details' : 'Create Car' }</h1>
					<Link class="ml-auto btn btn-default" href="/fleet">Back</Link>
					<div class="actions">
					</div>
				</div>
				<form onSubmit={this.handleSubmit}>
					<div>
						<label>Name</label>
						<input type="text" value={state.form.name} name="name" onChange={this.handleChange} />
					</div>
					<div>
						<label>Description</label>
						<textarea rows="8" value={state.form.description} name="description" onChange={this.handleChange} />
					</div>
					<div>
						<label>Max</label>
						<input type="number" value={state.form.max} name="max" onChange={this.handleChange} disabled={car && car.used}/>
						{ (car && car.used) && <p>Can't change max because car is in use</p> }
					</div>
					<button class="btn btn-hero" type="submit">{id ? 'Update' : 'Create'}</button>
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
							<h1>Delete car</h1>
							<p>Do you really want to delete this car?</p>
							<button class="btn btn-warn" onClick={this.delete}>Delete</button>
						</ModalPopup>
					</SlotContent>
				) : null }
			</div>
		);
	}
}
