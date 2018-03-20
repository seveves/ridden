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
			<div class="margin-top">
				<h1 class="title">shuttle offers</h1>
				<Link href="/offer-details">Create</Link>
				<OffersList offers={offers}></OffersList>
			</div>
		);
	}
}
