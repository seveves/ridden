import { h, Component } from 'preact';
import style from './style';

export default class Home extends Component {

  render() {
    return (
      <div class={style['home'] + ' margin-top'}>
        <h1 class="title">Home</h1>
        <p class="sub-title">ride, rode, ridden and again</p>
      </div>
    )
  }
}