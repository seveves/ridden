import { h, Component } from 'preact';
import { Link } from 'preact-router/match';

import { get } from '../../api';
import style from './style';

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
			<div class="margin-top">
				<h1 class="title">fleet</h1>
				<div class={style['fleet-container']}>
					<div class={style['fleet-cars-list']}>
						<h2>Your fleet</h2>
						<Link href="/fleet-details">Create</Link>
						<CarsList cars={cars}></CarsList>
					</div>
				</div>
			</div>
		);
	}
}
