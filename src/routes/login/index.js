import { h, Component } from 'preact';
import style from './style';
import { login } from '../../api';
import { serialize, toErrors } from '../../utils';

const AUTH = GOOGLE_AUTH_URL;

export default class Login extends Component {

	state = { loading: false, error: null };

	componentDidMount() {
		if (this.props.token) {
			this.setState({ loading: true }, () => {
				login(atob(this.props.token)).then(() => {
					this.setState({ loading: false });
				}, (err) => {
					this.setState({ loading: false, error });
				});
			});
		}
	}

	render({ token }, { loading, error }) {
		return (
			<div class="margin-top">
				<h1 class="title">login</h1>
				{ error ? <p>{error}</p> : null }
				<a href={AUTH}>Login via Google</a>
			</div>
		);
	}
}
