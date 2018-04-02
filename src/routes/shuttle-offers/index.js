import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import { connect } from 'unistore/preact';
import { actions } from '../../store';

import { OffersList } from '../../components/offers-list';

@connect('offers', actions)
export default class ShuttleOffers extends Component {

	componentDidMount() {
		this.props.getOffers();
	}

	render({ user, offers, getOffers }) {
    if (!user.isVendor) {
      return (<p>No access to this route.</p>);
    }
		return (
			<div>
				<div class="d-flex flex-row">
					<h1 class="page-title">Shuttle Offers</h1>
					<Link class="btn btn-hero ml-auto" href="/offer-details">Create</Link>
				</div>
				<OffersList offers={offers}></OffersList>
			</div>
		);
	}
}
