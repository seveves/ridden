import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import { SlotContent } from 'preact-slots';

import { get, post } from '../../api';
import { sum } from '../../utils';

import ModalPopup from '../../components/modal-popup';

export default class ShuttleDetails extends Component {

	state = {
		shuttle: null,
		showHopOff: false,
		showHopOn: false,
		on: false,
		taken: 0,
		amount: 1
	};

	loadShuttle() {
		get(`shuttles/${this.props.id}`)
			.then(shuttle => {
				const on = shuttle.bookings.map(b => b.riderId).indexOf(this.props.user._id) !== -1;
				const taken = sum(shuttle.bookings, b => b.amount);
				this.setState({ shuttle, on, taken });
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

	handleChange = e => {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		this.setState({ [name]: value });
	}
		
	hopOn() {
		const amount = Math.floor(+this.state.amount);
		this.setState({ showHopOff: false, showHopOn: false, amount: 1 }, () => {
			post(`shuttles/${this.props.id}/hopon`, { amount }).then(() => this.loadShuttle());
		});
	}

	hopOff() {
		this.setState({ showHopOff: false, showHopOn: false }, () => {
			post(`shuttles/${this.props.id}/hopoff`).then(() => this.loadShuttle());
		});
	}

	componentDidMount() {
		this.loadShuttle();
	}

	render({ id, user, isVendor }, { shuttle, on, showHopOff, showHopOn, taken, amount }) {
		return (
			<div>
				{ shuttle
					?	<div>
							<div class="page-title d-flex flex-row aic">
								<h1>{shuttle.title}</h1>
								{ (!on && taken < shuttle.max) && <button class="ml-auto btn btn-default" onClick={this.hopOnModal}><span>Hop on</span></button> }
								{ on && <button class="ml-auto btn btn-default"  onClick={this.hopOffModal}><span>Hop off</span></button> }
								{ isVendor && <Link class="btn btn-default ml-2" href={`/offer-details/${id}`}><span>Edit</span></Link> }
							</div>
							<h2 class="extra-title">Starting on {new Date(shuttle.departure).toLocaleTimeString()} at {new Date(shuttle.departure).toLocaleDateString()}</h2>
							<h3 class="extra-title">Description</h3>
							<p>{shuttle.description}</p>
							<h3 class="extra-title">Seats Taken</h3>
							<p>{taken} of {shuttle.max}</p>

							{ showHopOn && (
								<SlotContent slot="modal">
									<ModalPopup onClose={this.closeModal}>
										<h1>Hop on</h1>
										<p>Be part of this shuttle ride</p>
										<form>
											<input type="number" value={amount} name="amount" onChange={this.handleChange}/>
										</form>
										<button class="btn btn-hero" onClick={() => this.hopOn()}><span>Hop on</span></button>
									</ModalPopup>
								</SlotContent>
							)}
								
							{ showHopOff && (
								<SlotContent slot="modal">
									<ModalPopup onClose={this.closeModal}>
										<h1>Hop off</h1>
										<p>Can't make it anymore? Poor you.</p>
										<button class="btn btn-hero" onClick={() => this.hopOff()}><span>Hop off</span></button>
									</ModalPopup>
								</SlotContent>
							)}
						</div>
					: <div>Loading ...</div>
				}
			</div>
		);
	}
}