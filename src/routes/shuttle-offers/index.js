import { h, Component } from 'preact';
import { Link } from 'preact-router/match';

import { get } from '../../api';

import { OffersList } from '../../components/offers-list';

export default class ShuttleOffers extends Component {

	state = { offers: null };

	getOffers() {
		if (this.props.user) {
			get(`vendors/${this.props.user.vendorId}/shuttles`).then(offers => {
				this.setState({ offers });
			});
		}
	}

	componentDidMount() {
		this.getOffers();
	}

	render({ user, isVendor }, { offers }) {
    if (!isVendor) {
      return (<p>No access to this route.</p>);
    }
		return (
			<div>
				<div class="page-title d-flex flex-row aic">
					<h1>Shuttle Offers</h1>
					<Link class="btn btn-hero ml-auto" href="/offer-details"><span>Create</span></Link>
				</div>
				<OffersList offers={offers}></OffersList>
			</div>
		);
	}
}
