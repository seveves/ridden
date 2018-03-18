import { h, Component } from 'preact';
import Portal from 'preact-portal';
import style from './style';
import { get, post, del } from '../../api';

import ModalPopup from '../../components/modal-popup';

export default class ShuttleDetails extends Component {

	state = {
		ride: null,
		showHopOff: false,
		showHopOn: false,
		onThisRide: false,
		shuttleId: null,
		seatsTaken: 0
	};

	loadRide(id, userId) {
		get('shuttles/' + id)
			.then(ride => {
				this.setState({ ride }, () => this.isOnThisRide(ride, userId));
			});
	}

	isOnThisRide(ride, userId) {
		get('hop?shuttleId=' + ride._id).then(res => res.data).then(hops => {
			const hopIndex = hops.findIndex(hop => hop.userId === userId);
			this.setState({
				onThisRide: hopIndex !== -1,
				seatsTaken: hops.length,
				shuttleId: hopIndex !== -1 ? hops[hopIndex]._id : null
			});
		});
	}

	hopOnModal = ev => {
		ev.preventDefault();
		this.setState({ showHopOn: true });
	};
		
	hopOffModal = ev => {
		ev.preventDefault();
		this.setState({ showHopOff: true });
	};
		
	closeModal = ev => {
		ev.preventDefault();
		this.setState({ showHopOff: false, showHopOn: false });
	};
		
	hopOn() {
		this.setState({ showHopOff: false, showHopOn: false });
		post('hop', { shuttleId: this.props.id })
			.then(() => this.loadRide(this.props.id, this.props.user._id));
	}

	hopOff() {
		this.setState({ showHopOff: false, showHopOn: false });
		del('hop/' + this.state.shuttleId)
			.then(() => this.loadRide(this.props.id, this.props.user._id));
	}

	componentDidMount() {
		this.loadRide(this.props.id, this.props.user._id);
	}

	render({ id, user }, { ride, showHopOn, showHopOff, onThisRide, seatsTaken }) {
		const isCompany = user.roles && user.roles.indexOf('company') !== -1;
		return (
			<div>
				{ ride!==null ?
					<div class={style['shuttle-details'] + ' margin-top'}>
						<h1 class="title">{ride.title}</h1>
						<p class="sub-title">Starting on {new Date(ride.takingOff).toLocaleTimeString()} at {new Date(ride.takingOff).toLocaleDateString()}</p>
						<h3>description</h3>
						<p class={style.desc}>{ride.description}</p>
						<h3>available seats</h3>
						<p class={style.desc}>{seatsTaken} of {ride.availableSeats}</p>
						<div class="fab-container">
							{ onThisRide
								? <button onClick={this.hopOffModal}>Hop off</button>
								: <button onClick={this.hopOnModal} disabled={ride.seatsTaken >= ride.availableSeats}>Hop on</button>}
							<a href={`https://www.google.com/maps/dir/?api=1&destination=${ride.lat},${ride.lon}`}>Navigate</a>
							{ isCompany ? <a href={'/app/shuttles/edit/' + id}>Edit</a> : null }
						</div>

						{ showHopOn ? (
							<Portal into="body">
								<ModalPopup onClose={this.closeModal}>
									<h1>Hop on</h1>
									<p>Be part of this ride</p>
									<button onClick={this.hopOn}>Get on this ride!</button>
								</ModalPopup>
							</Portal>
						) : null }
							
						{ showHopOff ? (
							<Portal into="body">
								<ModalPopup onClose={this.closeModal}>
									<h1>Hop off</h1>
									<p>Can't make it anymore? Poor you.</p>
									<button onClick={this.hopOff}>Get off this ride!</button>
								</ModalPopup>
							</Portal>
						) : null }
					</div> : <div>Loading ...</div>
				}
			</div>
		);
	}
}