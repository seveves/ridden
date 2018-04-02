import { h, Component } from 'preact'
import { bus } from '../../utils';

export default class AlertToaster extends Component {

  state = {
    alerts: []
  };

  componentDidMount() {
    bus.on('alert:new', alert => {
      if (!alert.dismissable) {
        setTimeout(() => this.dismissAlert(alert), alert.showTime || 2000);
      }
      this.setState({ alerts: [ ...this.state.alerts, alert ] });
    });
  }

  dismissAlert(alert) {
    const alertIndex = this.state.alerts.indexOf(alert);
    if (alertIndex !== -1) {
      this.setState({
        alerts: [
          ...this.state.alerts.slice(0, alertIndex),
          ...this.state.alerts.slice(alertIndex + 1)
        ]
      });
    }
  }

  render({}, { alerts }) {
    return (
      <div class="alerts">
       {
         alerts.map(alert => (
            <div class={'alert alert-' + alert.type}>
              { alert.dismissable &&
                <div class="alert-close" onClick={() => this.dismissAlert(alert)}>
                  <svg viewBox="0 0 24 24">
                    <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                  </svg>
                </div>
              }
              <div class="alert-title">{alert.title}</div>
              <div class="alert-message">{alert.message}</div>
            </div>
          )
        )
       }
      </div>
    )
  }
}