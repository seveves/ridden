import { h } from 'preact';
import { Link } from 'preact-router/match';
import { sum } from '../../utils';

export const ShuttlesList = ({ shuttles }) => (
	<div>
		{ shuttles !== null
			? ( 
					<ul class="list">
					{
						shuttles.map((shuttle) => (
							<li>
								<Link href={`/shuttle-details/${shuttle._id}`}>
									<div class="list-group">
										<div class="list-label toe">{shuttle.title}</div>
										<div class="list-text toe">{shuttle.description}</div>
									</div>
									<div class="list-group">
										<div class="list-label">{new Date(shuttle.departure).toLocaleString()}</div>
										<div class="list-text">departure</div>
									</div>
									<div class="list-group">
										<div class="list-label">{sum(shuttle.bookings, b => b.amount)}/{shuttle.max}</div>
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
		{ shuttles === null
			? <p>Loading ⏳</p>
			: (!shuttles.length)
				? <p>there are no shuttles near your place 🙁</p>
				: null }
	</div>
);
