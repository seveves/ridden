import { h } from 'preact';

export const BookingsList = ({ bookings }) => (
	<div>
		{ bookings !== null ? bookings.map((booking) => (
			<p>{booking.title}</p>
		)) : null }
		{ bookings === null
			? <p>Loading ⏳</p>
			: (!bookings.length)
				? <p>you have nothing booked 🙁</p>
				: null }
	</div>
);
