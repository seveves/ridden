import { h } from 'preact';
import { Link } from 'preact-router/match';
import { sum } from '../../utils';

export const BookingsList = ({ bookings }) => (
	<div>
		{ bookings !== null
			? ( 
					<ul class="list">
					{
						bookings.map((booking) => (
							<li>
								<Link href={`/bookings/${booking._id}`}>
									<div class="list-group">
										<div class="list-label toe">{booking.title}</div>
										<div class="list-text toe">{booking.description}</div>
									</div>
									<div class="list-group">
										<div class="list-label">{new Date(booking.departure).toLocaleString()}</div>
										<div class="list-text">departure</div>
									</div>
									<div class="list-group">
										<div class="list-label">{sum(booking.bookings, b => b.amount)}/{booking.max}</div>
										<div class="list-text">seats taken</div>
									</div>
									<div class="list-group asc">
										<svg style="width:24px;height:24px" viewBox="0 0 24 24">
											<path fill="#666" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
										</svg>
									</div>
								</Link>
							</li>
						))
					}
					</ul>
				)
			: null }
		{ bookings === null
			? <p>Loading ⏳</p>
			: (!bookings.length)
				? <p>you haven't booked a shuttle yet 🙁</p>
				: null }
	</div>
);
