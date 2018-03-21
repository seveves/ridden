import { h, Component } from 'preact';
import { Link } from 'preact-router/match';

import { get } from '../../api';

import { CarsList } from '../../components/cars-list';

export default class Fleet extends Component {

	state = { cars: null };

	getCars() {
		if (this.props.user) {
			get(`cars`).then(cars => {
				this.setState({ cars });
			});
		}
	}

	componentDidMount() {
		this.getCars();
	}

	render({ user, isVendor }, { cars, selectedCarId }) {
    if (!isVendor) {
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
