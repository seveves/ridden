import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import { SlotContent } from 'preact-slots';

import { get, post, put, del } from '../../api';

import ModalPopup from '../../components/modal-popup';

export default class CreateEditCar extends Component {

	state = {
		form: {
			max: 10,
			name: '',
			description: ''
		},
		used: false,
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
			put(`cars/${this.props.id}`, { ...this.state.form }).then(() => console.log('updated'));
		}
		else {
			post('cars', { ...this.state.form }).then(() => history.back());
		}
	}

	delete = ev => {
		ev.preventDefault();
		if (this.props.id) {
			this.setState({ showConfirm: false }, () => {
				del(`cars/${this.props.id}`).then(() => history.back());
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
			get(`cars/${this.props.id}`).then(car => {
				const form = { ...car };
				delete form.used;
				this.setState({ form, used: car.used });
			});
		}
	}

	render({ id, user, isVendor }, state) {
		return (
			<div>
				<div class="page-title d-flex flex-row aic">
					<h1>{ id ? 'Car Details' : 'Create Car' }</h1>
					<Link class="ml-auto btn btn-default" href="/fleet"><span>Back</span></Link>
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
						<input type="number" value={state.form.max} name="max" onChange={this.handleChange} disabled={state.used}/>
						{ state.used && <p>Can't change max because car is in use</p> }
					</div>
					<button class="btn btn-hero" type="submit"><span>{id ? 'Update' : 'Create'}</span></button>
				</form>
				{ id
					? 
						<div>
							<h3 class="extra-title">Extra actions</h3>
							<button class="btn btn-warn" onClick={this.confirmDelete}><span>Delete</span></button>
						</div>
					: null }
				{ state.showConfirm ? (
					<SlotContent slot="modal">
						<ModalPopup onClose={this.closeModal}>
							<h1>Delete car</h1>
							<p>Do you really want to delete this car?</p>
							<button onClick={this.delete}>Delete</button>
						</ModalPopup>
					</SlotContent>
				) : null }
			</div>
		);
	}
}
