import { login, logout } from '../api';
import { bus } from '../utils';

const userActions = store => ({
  login(state, token) {
    login(token, state.user)
      .then(user => {
        bus.emit('alert:new', { type: 'ok', title: 'Welcome!', message: `Nice to see you ${user.name}` });
        user.isVendor = user.roles.some(r => r === 'vendor') && user.vendorId && user.vendorId.length > 0;
        store.setState({ user });
      },
      err => bus.emit('alert:new', { type: 'fail', title: 'Login failed', message: err, dismissable: true })
    );
  },

  logout(state) {
    logout().then(
      () => store.setState({ user: null }),
      err => bus.emit('alert:new', { type: 'fail', title: 'Logout failed', message: err, dismissable: true })
    );
  }
});

export default userActions;