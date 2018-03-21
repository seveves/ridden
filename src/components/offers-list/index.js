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
									<div>
										<div class="list-label">{offer.title}</div>
										<div class="list-text toe">{offer.description}</div>
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
