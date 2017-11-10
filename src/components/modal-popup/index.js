import { h, Component } from 'preact';
import style from './style';

export default class ModalPopup extends Component {
  render({ children }) {
    return (
      <div class={style.modal}>

        <div class={stlyle['modal-content']}>
          <span class={style.close}>&times;</span>
          <div>{this.props.children}</div>
        </div>

      </div>      
    )
  }
}