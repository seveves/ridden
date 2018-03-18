import { h } from 'preact';

export const ShuttlesList = ({ shuttles }) => (
	<div>
		{ shuttles !== null ? shuttles.map((shuttle) => (
			<p>{shuttle.title}</p>
		)) : null }
		{ shuttles === null
			? <p>Loading ⏳</p>
			: (!shuttles.length)
				? <p>there are no shuttles at the moment 🙁</p>
				: null }
	</div>
);
