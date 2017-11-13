import { h, Component } from 'preact';
import style from './style';
import { serialize, toErrors } from '../../utils';
import { login } from '../../api';

export default class Login extends Component {

  state = { loading: false, errors: [] };

  onSubmit = ev => {
    ev.preventDefault();
    let user = serialize(ev.target);
    this.setState({ loading: true }, () => {
      login({ user }).then(console.log).catch(err => {
        this.setState({
          loading: false,
          errors: toErrors(err.errors)
        });
      });
    });
  }

  render({ }, { loading, errors }) {
    return (
      <div class={style.login + ' margin-top'}>
        <h1 class="title">Login</h1>
        <p class="sub-title">login or logout. that's the question</p>
        <ul class="error-messages">
          { errors.map(str => <li>{str}</li>) }
        </ul>
        <form onsubmit={this.onSubmit}>
          <input name="email" type="email" placeholder="Email" disabled={loading} />
          <input name="password" type="password" placeholder="Password" disabled={loading} />
          <button disabled={loading}>Log in</button>
        </form>
      </div>
    )
  }
}