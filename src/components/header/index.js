import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';
import { logout } from '../../api/index';

export default class Header extends Component {

	logout = logout;

	navigateBack = () => {
		history.back();
	}

	render({ user, isVendor }) {
		return (
			<header class={style.header}>
				<h1><a href="/">ridden</a></h1>
				{ user
					? (
						<nav>
							<Link activeClassName={style.active} href="/">shuttles</Link>
							<Link activeClassName={style.active} href="/bookings">bookings</Link>
							{ isVendor ? <Link activeClassName={style.active} href="/offers">shuttle offers</Link> : null }
							{ isVendor ? <Link activeClassName={style.active} href="/fleet">car fleet</Link> : null }
							<Link activeClassName={style.active} href="/login" onClick={this.logout}>logout</Link>
						</nav>
					)
					: (
						<nav>
							<Link activeClassName={style.active} href="/login">login</Link>
						</nav>
					)
				}
			</header>
		);
	}
}
