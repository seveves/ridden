import { h, Component } from 'preact';
import style from './style';

export default class DistancePicker extends Component {

	state = { distance: 0 }

	changeDistance = ev => {
		this.setState({ distance: +ev.target.value });
	}

	updateDistance = ev => {
		if (this.props.onUpdateDistance) {
			this.props.onUpdateDistance(+ev.target.value);
		}
	}

	render({ onUpdateDistance }, { distance }) {
		return (
			<div class={style['distance-picker']}>
				<div class={style['slider-text']}>
					<span>{ distance === 0 ? 'showing ' : 'within a radius of ' }</span>
					<span class={style['slider-value']}>{ distance === 0 ? 'All' : distance }</span>
					{ distance !== 0 && <span> km</span> }
				</div>
				<input class={style.slider} type="range" step="5" min="0" max="1000"
					onInput={this.changeDistance}
					onChange={this.updateDistance} value={distance} />
			</div>
		);
	}
}
