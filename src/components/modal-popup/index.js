import { h, Component } from 'preact';
import style from './style';

export default class ModalPopup extends Component {
  render({ children, onClose }) {
    return (
      <div class={style.modal} onClick={onClose}>

        <div class={style['modal-content']} onClick={(e) => e.stopPropagation()}>
          <span class={style.close} onClick={onClose}>&times;</span>
          <div>{this.props.children}</div>
        </div>

      </div>      
    )
  }
}