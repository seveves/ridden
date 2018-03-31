import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import { bus } from '../../utils';

export default class Header extends Component {

	toggleMenu = () => {
    document.getElementsByClassName('burger')[0].classList.toggle('change');
    document.getElementsByClassName('toggle-vis')[0].classList.toggle('hidden-sm');
	}
	
	componentDidMount() {
		bus.on('route:change', ev => this.toggleMenu());
	}

	render({ user, logout }) {
		return (
			<header>
				<h1><a href="/">ridden</a></h1>
				<div class="burger" onClick={this.toggleMenu}>
          <div class="bar1"></div>
          <div class="bar2"></div>
          <div class="bar3"></div>
        </div>
				{ user
					? (
						<nav class="toggle-vis hidden-sm">
							<Link activeClassName="active" href="/">shuttles</Link>
							<Link activeClassName="active" href="/bookings">bookings</Link>
							{ user.isVendor ? <Link activeClassName="active" href="/offers">shuttle offers</Link> : null }
							{ user.isVendor ? <Link activeClassName="active" href="/fleet">car fleet</Link> : null }
							<Link activeClassName="active" href="/login" onClick={logout}>logout</Link>
						</nav>
					)
					: (
						<nav class="toggle-vis hidden-sm">
							<Link activeClassName="active" href="/login">login</Link>
						</nav>
					)
				}
			</header>
		);
	}
}
