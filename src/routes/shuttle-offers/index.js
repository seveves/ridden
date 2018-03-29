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
				<div class="page-title d-flex flex-row aic">
					<h1>Shuttle Offers</h1>
					<Link class="btn btn-hero ml-auto" href="/offer-details"><span>Create</span></Link>
				</div>
				<OffersList offers={offers}></OffersList>
			</div>
		);
	}
}
