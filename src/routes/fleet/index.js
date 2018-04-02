import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import { connect } from 'unistore/preact';
import { actions } from '../../store';

import { CarsList } from '../../components/cars-list';

@connect('cars', actions)
export default class Fleet extends Component {

	componentDidMount() {
		this.props.getCars();
	}

	render({ user, cars, getCars }) {
    if (!user.isVendor) {
      return (<p>No access to this route.</p>);
    }
		return (
			<div>
				<div class="d-flex flex-row">
					<h1 class="page-title">Fleet</h1>
					<Link class="btn btn-hero ml-auto" href="/fleet-details">Create</Link>
				</div>
				<div>
					<div>
						<CarsList cars={cars}></CarsList>
					</div>
				</div>
			</div>
		);
	}
}
