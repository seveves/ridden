import { h } from 'preact';
import { Link } from 'preact-router/match';

export const CarsList = ({ cars }) => (
	<div>
		{ cars !== null ? cars.map((car) => (
			<Link href={`/fleet-details/${car._id}`}>{car.name}</Link>
		)) : null }
		{ cars === null
			? <p>Loading ⏳</p>
			: (!cars.length)
				? <p>you have no cars in your fleet 🙁</p>
				: null }
	</div>
);
