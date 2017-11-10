import { h, Component } from 'preact';
import style from './style';

export default class CreateEditRide extends Component {

  render() {
    return (
      <div class={style['create-edit-ride'] + ' margin-top'}>
        <h1 class="title">Create/Edit</h1>
        <p class="sub-title">create or edit your ride</p>
      </div>
    )
  }
}