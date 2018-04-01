import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import { bus } from '../../utils';

const BURGER_OPEN = 'burger change';
const BURGER_CLOSE = 'burger';
const MENU_OPEN = 'toggle-vis';
const MENU_CLOSE = 'toggle-vis hidden-sm';

export default class Header extends Component {

	state = {
		menuOpen: false
	};

	toggleMenu = () => {
		this.setState({ menuOpen: !this.state.menuOpen });
	}
	
	componentDidMount() {
		bus.on('route:change', ev => {
			if (this.state.menuOpen) {
				this.setState({ menuOpen: false });
			}
		});
	}

	render({ user, logout }, { menuOpen }) {
		return (
			<header>
				<h1><a href="/">ridden</a></h1>
				<div class={menuOpen ? BURGER_OPEN : BURGER_CLOSE } onClick={this.toggleMenu}>
          <div class="bar1"></div>
          <div class="bar2"></div>
          <div class="bar3"></div>
        </div>
				{ user
					? (
						<nav class={menuOpen ? MENU_OPEN : MENU_CLOSE}>
							<Link activeClassName="active" href="/">shuttles</Link>
							<Link activeClassName="active" href="/bookings">bookings</Link>
							{ user.isVendor ? <Link activeClassName="active" href="/offers">shuttle offers</Link> : null }
							{ user.isVendor ? <Link activeClassName="active" href="/fleet">car fleet</Link> : null }
							<Link activeClassName="active" href="/login" onClick={logout}>logout</Link>
						</nav>
					)
					: (
						<nav class={menuOpen ? MENU_OPEN : MENU_CLOSE}>
							<Link activeClassName="active" href="/login">login</Link>
						</nav>
					)
				}
			</header>
		);
	}
}
