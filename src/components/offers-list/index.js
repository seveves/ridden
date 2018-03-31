import { h } from 'preact';
import { Link } from 'preact-router/match';
import { sum } from '../../utils';

export const OffersList = ({ offers }) => (
	<div>
		{ offers !== null
			? ( 
					<ul class="list">
					{
						offers.map((offer) => (
							<li>
								<Link href={`/offer-details/${offer._id}`}>
									<div class="list-group">
										<div class="list-label toe">{offer.title}</div>
										<div class="list-text toe">{offer.description}</div>
									</div>
									<div class="list-group">
										<div class="list-label">{sum(offer.bookings, b => b.amount)}/{offer.max}</div>
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
		{ offers === null
			? <p>Loading ⏳</p>
			: (!offers.length)
				? <p>you do not offer any shuttles 🙁</p>
				: null }
	</div>
);
