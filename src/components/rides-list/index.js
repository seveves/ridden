import { h, Component } from 'preact';
import style from './style';

import RidesListItem from '../../components/rides-list-item';

export default class RidesList extends Component {

	render({ rides, onDelete }) {
		return (
			<div class={style['rides-list']}>
				{ rides ? rides.map((ride) => (
					<RidesListItem ride={ride} onDelete={onDelete} />
				)) : null }
				{ (!rides)
						? <p class={style['no-rides']}>Loading ⏳</p>
						: (!rides.length)
							? <p class={style['no-rides']}>there are no rides at the moment 🙁</p>
						: null }
			</div>
		);
	}
}
