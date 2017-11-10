import { h, Component } from 'preact';
import style from './style';

const API_ORIGIN = 'http://192.168.0.185:3000';

export default class CreateEditRide extends Component {

  state = {
    title: '',
    description: '',
    languages: [],
    duration: 0,
    lat: 48.596603,
    long: 9.414554,
    seats: 10,
    seatsLeft: 10,
    startingAt: new Date().toISOString(),
  };

  handleChange = e => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({ [name]: value });
  } 

  handleSubmit = e => {
    e.preventDefault();

    if (this.props.id) {
      const headers = new Headers({ 'Content-Type': 'application/json' });
      const putInit = {
        method: 'PUT',
        headers,
        body: JSON.stringify({
          description: this.state.description,
          title: this.state.title,
          duration: this.state.duration,
          location: { lat: this.state.lat, long: this.state.long },
          seats: { available: this.state.seats, left: this.state.seatsLeft },
          starting_at: new Date(this.state.startingAt).toUTCString(),
        })
      };
      fetch(`${API_ORIGIN}/rides/${this.props.id}`, putInit)
        .then(() => history.back());
    } else {
      const headers = new Headers({ 'Content-Type': 'application/json' });
      const postInit = {
        method: 'POST',
        headers,
        body: JSON.stringify({
          description: this.state.description,
          title: this.state.title,
          duration: this.state.duration,
          location: { lat: this.state.lat, long: this.state.long },
          seats: { available: this.state.seats, left: this.state.seatsLeft },
          starting_at: new Date(this.state.startingAt).toUTCString(),
          languages: [],
        })
      };
      fetch(`${API_ORIGIN}/rides`, postInit)
        .then(() => history.back());
    }
  }

  componentDidMount() {
    fetch(`${API_ORIGIN}/rides/${this.props.id}`)
      .then(r => r.json())
      .then(ride => this.setState({
        title: ride.title,
        description: ride.description,
        languages: ride.languages,
        duration: ride.duration,
        lat: ride.location.lat,
        long: ride.location.long,
        seats: ride.seats.available,
        startingAt: ride.starting_at,
        seatsLeft: ride.seats.left,
      }));
  }

  render({ id }, { title, description, duration, lat, long, seats, startingAt }) {
    return (
      <div class={style['create-edit-ride'] + ' margin-top'}>
        <h1 class="title">{ id ? 'edit ride' : 'create new ride' }</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Title</label>
            <input type="text" value={title} name="title" onChange={this.handleChange} />
          </div>
          <div>
            <label>Description</label>
            <textarea rows="8" value={description} name="description" onChange={this.handleChange} />
          </div>
          <div>
            <label>Duration</label>
            <input type="number" value={duration} name="duration" onChange={this.handleChange} />
          </div>
          <div>
            <label>Seats</label>
            <input type="number" value={seats} name="seats" onChange={this.handleChange} />
          </div>
          <div>
            <label>Taking off</label>
            <input type="text" value={startingAt} name="startingAt" onChange={this.handleChange} />
          </div>
          <div>
            <label>Location</label>
            <div>
              <input type="number" step="any" value={lat} name="lat" onChange={this.handleChange} />
              <input type="number" step="any" value={long} name="long" onChange={this.handleChange} />
            </div>
          </div>
          <input type="submit" value={ id ? 'save' : 'create' } />
        </form>
      </div>
    )
  }
}