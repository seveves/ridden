import { h, Component } from 'preact';
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
			<div>
				<h1 class="page-title d-flex aic">login</h1>
				{ error ? <p>{error}</p> : null }
				<a class="btn btn-hero" href={AUTH}>
					<span><svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path fill="#FFF" d="M23,11H21V9H19V11H17V13H19V15H21V13H23M8,11V13.4H12C11.8,14.4 10.8,16.4 8,16.4C5.6,16.4 3.7,14.4 3.7,12C3.7,9.6 5.6,7.6 8,7.6C9.4,7.6 10.3,8.2 10.8,8.7L12.7,6.9C11.5,5.7 9.9,5 8,5C4.1,5 1,8.1 1,12C1,15.9 4.1,19 8,19C12,19 14.7,16.2 14.7,12.2C14.7,11.7 14.7,11.4 14.6,11H8Z" />
</svg></span>
				</a>
			</div>
		);
	}
}
