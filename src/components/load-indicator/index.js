import { h, Component } from 'preact'
import { bus } from '../../utils';

export default class LoadIndicator extends Component {

  state = {
    showProgress: false
  };

  componentDidMount() {
    bus.on('network:loadstart', () => {
      !this.state.showProgress && this.setState({ showProgress: true });
    });
    bus.on('network:loadend', () => {
      this.state.showProgress && this.setState({ showProgress: false });
    });
  }

  render({}, { showProgress }) {
    return (
      <div class={'load-indicator' + (showProgress ? ' active' : '')}></div>
    )
  }
}