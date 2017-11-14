import { h, Component } from 'preact';
import style from './style';

export default class DistancePicker extends Component {

  state = { distance: 100 }

  changeDistance(e) {
    this.setState({ distance: +e.target.value });
  }

  updateDistance(e) {
    if (this.props.onUpdateDistance) {
      this.props.onUpdateDistance(+e.target.value);
    }
  }

	render({ onUpdateDistance }, { distance }) {
		return (
			<div class={style['distance-picker']}>
        <div class={style['slider-text']}>
          <span>within a radius of </span>
          <span class={style['slider-value']}>{distance}</span>
          <span> km</span>
        </div>
        <input class={style['slider']} type="range" step="5" min="5" max="1000"
               onInput={(e) => this.changeDistance(e)}
               onChange={(e) => this.updateDistance(e)} value={distance}/>
      </div>
		);
	}
}
