import { h } from 'preact';
import { Link } from 'preact-router/match';

export const OffersList = ({ offers }) => (
	<div>
		{ offers !== null
			? ( 
					<ul class="list w-auto">
					{
						offers.map((offer) => (
							<Link href={`/offer-details/${offer._id}`}>
								<li>
									<div class="d-flex flex-row aic">
										<div>
											<div class="list-label">{offer.title}</div>
											<div class="list-text toe">{offer.description}</div>
										</div>
										<div class="ml-auto mr-2">
											<div class="list-label">{offer.bookings.length}/{offer.max}</div>
											<div class="list-text">seats taken</div>
										</div>
										<div>
											<svg style="width:24px;height:24px" viewBox="0 0 24 24">
												<path fill="#666" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
											</svg>
										</div>
									</div>
								</li>
							</Link>
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
