import { h, Component } from 'preact';

export default class ModalPopup extends Component {

	handleEvent = ev => {
		ev.stopPropagation();
	}

	render({ children, onClose }) {
		return (
			<div class="modal" onClick={onClose}>
				<div class="modal-container" onClick={this.handleEvent}>
					<span class="close" onClick={onClose}>&times;</span>
					<div>{this.props.children}</div>
				</div>
			</div>
		);
	}
}
