import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import { SlotContent } from 'preact-slots';
import { connect } from 'unistore/preact';
import { actions } from '../../store';

import ModalPopup from '../../components/modal-popup';

@connect('shuttle', actions)
export default class ShuttleDetails extends Component {

	state = {
		showHopOff: false,
		showHopOn: false,
		amount: 1
	};

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
			this.props.hopOn(amount);
		});
	}

	hopOff() {
		this.setState({ showHopOff: false, showHopOn: false }, () => {
			this.props.hopOff();
		});
	}

	componentDidMount() {
		this.props.getShuttle(this.props.id);
	}

	render({ id, user, shuttle, getShuttle, hopOn, hopOff }, { showHopOff, showHopOn, amount }) {
		return (
			<div>
				{ shuttle
					?	<div>
							<div class="d-flex flex-row">
								<h1 class="page-title">{shuttle.title}</h1>
								{ (!shuttle.on && shuttle.taken < shuttle.max)
									&& <button class="ml-auto btn btn-default" onClick={this.hopOnModal}><span onClick={this.hopOnModal}>Hop on</span></button> }
								{ shuttle.on && <button class="ml-auto btn btn-default" onClick={this.hopOffModal}><span onClick={this.hopOffModal}>Hop off</span></button> }
								{ user.isVendor && <Link class="btn btn-default ml-2" href={`/offer-details/${id}`}><span>Edit</span></Link> }
							</div>
							<h2 class="extra-title">Starting on {new Date(shuttle.departure).toLocaleTimeString()} at {new Date(shuttle.departure).toLocaleDateString()}</h2>
							<h3 class="extra-title">Description</h3>
							<p>{shuttle.description}</p>
							<h3 class="extra-title">Seats Taken</h3>
							<p>{shuttle.taken} of {shuttle.max}</p>

							{ showHopOn && (
								<SlotContent slot="modal">
									<ModalPopup onClose={this.closeModal}>
										<h1>Hop on</h1>
										<p>Be part of this shuttle ride</p>
										<form>
											<input type="number" value={amount} name="amount" onChange={this.handleChange}/>
										</form>
										<button class="btn btn-hero" onClick={() => this.hopOn()}>
											<span onClick={() => this.hopOn()}>Hop on</span>
										</button>
									</ModalPopup>
								</SlotContent>
							)}
								
							{ showHopOff && (
								<SlotContent slot="modal">
									<ModalPopup onClose={this.closeModal}>
										<h1>Hop off</h1>
										<p>Can't make it anymore? Poor you.</p>
										<button class="btn btn-hero" onClick={() => this.hopOff()}>
											<span onClick={() => this.hopOff()}>Hop off</span>
										</button>
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