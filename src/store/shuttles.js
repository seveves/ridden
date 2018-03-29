import { get, post, put, del } from '../api';
import { sum } from '../utils';

const shuttlesActions = store => ({
  async getShuttles(state, params) {
    const shuttles = await get(`shuttles${params}`);
    return { shuttles };
  },

  async getShuttle(state, id) {
    if (!state.user) {
      return state;
    }
    const shuttleIndex = state.shuttles.findIndex(s => s._id === id);
    if (shuttleIndex !== -1) {
      const exShuttle = { ...state.shuttles[shuttleIndex] };
      return {
        shuttle: {
          ...exShuttle,
          on: exShuttle.bookings.map(b => b.riderId).indexOf(state.user._id) !== -1,
          taken: sum(exShuttle.bookings, b => b.amount)
        }
      };
    }
    const shuttle = await get(`shuttles/${id}`);
    return {
      shuttle: {
        ...shuttle,
        on: shuttle.bookings.map(b => b.riderId).indexOf(state.user._id) !== -1,
        taken: sum(shuttle.bookings, b => b.amount)
      }
    }
  },

  async hopOn(state, amount) {
    await post(`shuttles/${state.shuttle._id}/hopon`, { amount });
    const shuttle = await get(`shuttles/${state.shuttle._id}`);
    return {
      shuttle: {
        ...shuttle,
        on: shuttle.bookings.map(b => b.riderId).indexOf(state.user._id) !== -1,
        taken: sum(shuttle.bookings, b => b.amount)
      }
    };
  },

  async hopOff(state) {
    await post(`shuttles/${state.shuttle._id}/hopoff`);
    const shuttle = await get(`shuttles/${state.shuttle._id}`);
    return {
      shuttle: {
        ...shuttle,
        on: shuttle.bookings.map(b => b.riderId).indexOf(state.user._id) !== -1,
        taken: sum(shuttle.bookings, b => b.amount)
      }
    };
  },

  async getBookings(state) {
    if (!state.user) {
      return state;
    }
    const bookings = await get(`riders/${state.user._id}/shuttles`);
    return { bookings };
  }
});

export default shuttlesActions;