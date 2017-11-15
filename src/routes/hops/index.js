import { h, Component } from 'preact';
import style from './style';
import { get } from '../../api';

import RidesList from '../../components/rides-list';

export default class Hops extends Component {

	state = { hops: null };
	
	componentDidMount() {
		get('hop')
			.then(res => res.data)
			.then(hops => {
				this.setState({
					hops: hops.filter(hop => hop['shuttle'] && hop.userId === this.props.user._id)
										.map(hop => hop.shuttle),
				});
			});
	}

	render({ user }, { hops }) {
		return (
			<div class={style.rides}>
				<h1 class="title margin-top">rides</h1>
				<p class="sub-title">showing your next shuttle rides. yeaha!</p>
				<RidesList rides={hops} />
			</div>
		);
	}
}
