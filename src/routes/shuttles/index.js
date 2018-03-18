import { h, Component } from 'preact';
import Portal from 'preact-portal';
import style from './style';
import { get, del } from '../../api';

import { RidesList } from '../../components/rides-list';
import ModalPopup from '../../components/modal-popup';

export default class Shuttles extends Component {

	state = { shuttles: null, showConfirm: false };
	
	loadShuttles() {
		get('shuttles')
			.then(res => res.data)
			.then(shuttles => {
				this.setState({ shuttles });
			});
	}
	
	confirmDelete = ev => {
		ev.preventDefault();
		this.setState({ showConfirm: true });
	}

	closeModal = ev => {
		ev.preventDefault();
		this.setState({ showConfirm: false });
	}

	deleteShuttle = id => {
		this.setState({ showConfirm: false }, () => {
			del(`shuttles/${id}`).then(() => this.loadShuttles());
		});
	}
	
	componentDidMount() {
		this.loadShuttles();
	}

	render({ }, { shuttles, showConfirm }) {
		return (
			<div class={style.rides}>
				<h1 class="title margin-top">shuttles</h1>
				<p class="sub-title">you are organizing these trips. nice!</p>
				<RidesList rides={shuttles} onDelete={this.deleteShuttle} />
				<div class="fab-container">
					<a href="/app/shuttles/create">create</a>
				</div>

				{ showConfirm ? (
					<Portal into="body">
						<ModalPopup onClose={this.closeModal}>
							<h1>Delete shuttle</h1>
							<p>Do you really want to delete this ride?</p>
							<button onClick={this.deleteShuttle}>Delete</button>
						</ModalPopup>
					</Portal>
				) : null }
			</div>
		);
	}
}
