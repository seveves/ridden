import { h, Component } from 'preact';
import style from './style';
import { get, post, del } from '../../api';

export default class RidesListItem extends Component {

	state = { seatsTaken: null };

 	onDeleteClick = e => {
 		e.stopPropagation();
	 	e.preventDefault();
	 	this.props.onDelete(this.props.ride._id);
 	}

  componentDidMount() {
		get('hop?shuttleId=' + this.props.ride._id).then(res => res.data).then(hops => {
			this.setState({ seatsTaken: hops.length });
		});
	}

	render({ ride, onDelete }, { seatsTaken }) {
		return (
			<a href={'/app/shuttles/details/' + ride._id} class={style['rides-list-item-link']}>
				<div class={style['rides-list-item']}>
					<div class={style.title}>{ride.title}</div>
					<div class={style.seats}>
						<span class={style.left}>{seatsTaken}</span>
						<span>/</span>
						<span class={style.available}>{ride.availableSeats}</span>
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
