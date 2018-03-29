import { login, logout } from '../api';

const userActions = store => ({
  login(state, token) {
    login(token, state.user)
      .then(user => {
        user.isVendor = user.roles.some(r => r === 'vendor') && user.vendorId && user.vendorId.length > 0;
        store.setState({ user });
      }, err => {
        console.log(err);
      });
  },

  logout(state) {
    logout().then(() => store.setState({ user: null }));
  }
});

export default userActions;