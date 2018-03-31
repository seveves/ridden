import { h, Component } from 'preact';
import { connect } from 'unistore/preact';
import { actions } from '../../store';

import { BookingsList } from '../../components/bookings-list';

@connect('bookings', actions)
export default class Bookings extends Component {

	componentDidMount() {
		this.props.getBookings();
	}

	render({ bookings, getBookings }) {
		return (
			<div>
				<h1 class="page-title">Bookings</h1>
				<BookingsList bookings={bookings}></BookingsList>
			</div>
		);
	}
}
