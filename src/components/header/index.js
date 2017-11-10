import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';

export default class Header extends Component {

	render({ showBack, authed }) {
		return (
			<header class={style.header}>
				{ showBack && authed
					? <h1 onClick={() => history.back()}>&lsaquo; back</h1>
					: <h1><a href="/">ridden</a></h1>
				}
				{ authed
					? (
							<nav>	
								<Link activeClassName={style.active} href="/rides">rides</Link>
								<Link activeClassName={style.active} href="/find-rides">find</Link>
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
