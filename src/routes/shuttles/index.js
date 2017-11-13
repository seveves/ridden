import { h, Component } from 'preact';
import style from './style';
import { get, del } from '../../api';

import RidesList from '../../components/rides-list';

export default class Shuttles extends Component {

	state = { shuttles: null };
	
	loadShuttles() {
		get('shuttles')
			.then(res => res.data)
			.then(shuttles => {
				this.setState({ shuttles });
			});
	}
	
	componentDidMount() {
		this.loadShuttles();
	}

	deleteShuttle = id => {
		if (confirm('delete this ride?')) {
			del('shuttles/' + id).then(() => this.loadShuttles());
		}
	}

	render({ }, { shuttles }) {
		return (
			<div class={style.rides}>
				<h1 class="title margin-top">shuttles</h1>
				<p class="sub-title">you are organizing these trips. nice!</p>
				<RidesList rides={shuttles} onDelete={this.deleteShuttle}/>
				<div class="fab-container"> 
					<a href="/shuttles/create">create</a>
				</div>
			</div>
		);
	}
}
