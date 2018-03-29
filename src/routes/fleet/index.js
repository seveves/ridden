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
				<div class="page-title d-flex flex-row aic">
					<h1>Fleet</h1>
					<Link class="btn btn-hero ml-auto" href="/fleet-details"><span>Create</span></Link>
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
