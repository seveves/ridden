import { h, Component } from 'preact';
import Portal from 'preact-portal';

import { get, post, put, del } from '../../api';

import ModalPopup from '../../components/modal-popup';

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
			get(`cars/${this.props.id}`).then(car => this.setState({ form: car }));
		}
	}

	render({ id, user, isVendor }, state) {
		return (
			<div class="margin-top">
				<h1 class="title">{ id ? 'details' : 'create' }</h1>
				{ id ? <button onClick={this.confirmDelete}>delete</button> : null }
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
						<input type="number" value={state.form.max} name="max" onChange={this.handleChange} />
					</div>
					<input type="submit" value={id ? 'save' : 'create'} />
				</form>
				{ state.showConfirm ? (
					<Portal into="body">
						<ModalPopup onClose={this.closeModal}>
							<h1>Delete car</h1>
							<p>Do you really want to delete this car?</p>
							<button onClick={this.delete}>Delete</button>
						</ModalPopup>
					</Portal>
				) : null }
			</div>
		);
	}
}
