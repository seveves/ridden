import { h } from 'preact';
import style from './style';

import RidesListItem from '../../components/rides-list-item';

export const RidesList = ({ rides, onDelete }) => (
	<div class={style['rides-list']}>
		{ rides !== null ? rides.map((ride) => (
			<RidesListItem ride={ride} onDelete={onDelete} />
		)) : null }
		{ rides === null
			? <p class={style['no-rides']}>Loading ⏳</p>
			: (!rides.length)
				? <p class={style['no-rides']}>there are no rides at the moment 🙁</p>
				: null }
	</div>
);
