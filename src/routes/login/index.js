import { h, Component } from 'preact';
import style from './style';

export default class Login extends Component {

  render() {
    return (
      <div class={style['login'] + ' margin-top'}>
        <h1 class="title">Login</h1>
        <p class="sub-title">login or logout. that's the question</p>
      </div>
    )
  }
}