import { h, Component } from 'preact';
import style from './style';

export default class RidesListItem extends Component {

	render({ ride }) {
		return (
			<a href={'/details/' + ride.id} class={style['rides-list-item-link']}>
				<div class={style['rides-list-item']}>
					<div class={style.title}>{ride.title}</div>
					<div class={style.seats}>
						<span class={style.left}>{ride.seats.left}</span>
						<span>/</span>
						<span class={style.available}>{ride.seats.available}</span>
					</div>
					<div class={style.arrow}>
						<span>&rsaquo;</span>
					</div>
				</div>
			</a>
		);
	}
}
