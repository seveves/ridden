import { h, Component } from 'preact';
import style from './style';

export default class RidesListItem extends Component {

 onDeleteClick = e => {
	 e.stopPropagation();
	 e.preventDefault();
	 this.props.onDelete(this.props.ride.id);
 }

	render({ ride, onDelete }) {
		return (
			<a href={'/details/' + ride.id} class={style['rides-list-item-link']}>
				<div class={style['rides-list-item']}>
					<div class={style.title}>{ride.title}</div>
					<div class={style.seats}>
						<span class={style.left}>{ride.seats.left}</span>
						<span>/</span>
						<span class={style.available}>{ride.seats.available}</span>
					</div>
					{ onDelete ?
						<div class={style.bin}>
							<span onClick={this.onDeleteClick}>🗑️</span>
						</div> : null }
					<div class={style.arrow}>
						<span>&rsaquo;</span>
					</div>
				</div>
			</a>
		);
	}
}
