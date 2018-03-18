import { h, Component } from 'preact';
import { get } from '../../api';

import { BookingsList } from '../../components/bookings-list';

export default class Bookings extends Component {

	state = { bookings: null };

	getBookings() {
		if (this.props.user) {
			get(`riders/${this.props.user._id}/shuttles`).then(bookings => {
				this.setState({ bookings });
			});
		}
	}

	componentDidMount() {
		this.getBookings();
	}

	render({ user }, { bookings }) {
		return (
			<div class="margin-top">
				<h1 class="title">bookings</h1>
				<BookingsList bookings={bookings}></BookingsList>
			</div>
		);
	}
}
