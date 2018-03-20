import { h } from 'preact';
import { Link } from 'preact-router/match';

export const OffersList = ({ offers }) => (
	<div>
		{ offers !== null ? offers.map((offer) => (
			<Link href={`/offer-details/${offer._id}`}>{offer.title}</Link>
		)) : null }
		{ offers === null
			? <p>Loading ⏳</p>
			: (!offers.length)
				? <p>you do not offer any shuttles 🙁</p>
				: null }
	</div>
);
