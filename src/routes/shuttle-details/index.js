import { h, Component } from 'preact';
import Portal from 'preact-portal';
import style from './style';
import { get } from '../../api';

import ModalPopup from '../../components/modal-popup';

export default class ShuttleDetails extends Component {

	state = { ride: null, showHopOff: false, showHopOn: false, onThisRide: false };

	loadRide(id) {
		get('shuttles/' + id)
			.then(ride => {
				this.setState({ ride }, () => this.isOnThisRide(ride));
			});
	}

	isOnThisRide(ride) {
		return get('hop?shuttleId=' + ride._id).then(res => res.data).then(hops => {
			this.setState({ onThisRide: hops.length > 0 });
		});
	}

	hopOn = () => this.setState({ showHopOn: true });
	hopOff = () => this.setState({ showHopOff: true });
	close = () => this.setState({ showHopOff: false, showHopOn: false });

	componentDidMount() {
		this.loadRide(this.props.id);
	}

	render({ id }, { ride, showHopOn, showHopOff, onThisRide }) {
		return (
			<div>
				{ ride
					? <div class={style['shuttle-details'] + ' margin-top'}>
							<h1 class="title">{ride.title}</h1>
							<p class="sub-title">Starting on {new Date(ride.takingOff).toLocaleTimeString()} at {new Date(ride.takingOff).toLocaleDateString()}</p>
							<h3>description</h3>
							<p class={style['desc']}>{ride.description}</p>
							<h3>available seats</h3>
							<p class={style['desc']}>{ride.leftSeats} of {ride.availableSeats}</p>
							<div class="fab-container"> 
								{ onThisRide
										? <button onClick={() => this.hopOff(ride)}>Hop off</button>
										: <button onClick={() => this.hopOn(ride)} disabled={ride.leftSeats >= ride.availableSeats}>Hop on</button>}
								<a href={`https://www.google.com/maps/dir/?api=1&destination=${ride.lat},${ride.lon}`}>Navigate</a>
								<a href={'/shuttles/edit/' + id}>Edit</a>
							</div>

							{ showHopOn ? (
								<Portal into="body">
									<ModalPopup onClose={this.close}>
										<h1>Hop on</h1>
									</ModalPopup>
								</Portal>
							) : null }
							
							{ showHopOff ? (
								<Portal into="body">
									<ModalPopup onClose={this.close}>
										<h1>Hop off</h1>
									</ModalPopup>
								</Portal>
							) : null }
						</div>
					: <div>Loading ...</div>
				}
			</div>
		)
	}
}