import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';
import { logout } from '../../api/auth';

export default class Header extends Component {

	logout = logout;

	render({ showBack, user }) {
		let isCompany = user.roles && user.roles.indexOf('company') !== -1;
		return (
			<header class={style.header}>
				{ showBack && user
						? <h1 onClick={() => history.back()}>&lsaquo; back</h1>
						: <h1><a href="/">ridden</a></h1>
				}
				{ user
						? (
								<nav>	
									<Link activeClassName={style.active} href="/app/hops">🚴</Link>
									{ isCompany ? <Link activeClassName={style.active} href="/app/shuttles">🚐</Link> : null }
									<Link activeClassName={style.active} href="/app/rides">🔎</Link>
									|
									<a href="/app/login" onClick={this.logout}>🔒</a>	
								</nav>	
							)
						: (
								<nav>
									<Link activeClassName={style.active} href="/app/login">🔑</Link>
								</nav>
							)
				}
			</header>
		);
	}
}
