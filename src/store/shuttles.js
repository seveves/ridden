import { get, post, put, del } from '../api';
import { sum } from '../utils';

const shuttlesActions = store => ({
  getShuttles(state, params) {
    return new Promise((resolve, reject) => {
      get(`shuttles${params}`).then(shuttles => resolve({ shuttles }));
    });
  },

  getShuttle(state, id) {
    return new Promise((resolve, reject) => {
      if (!state.user) {
        resolve(state);
      } else {
        const shuttleIndex = state.shuttles.findIndex(s => s._id === id);
        if (shuttleIndex !== -1) {
          const exShuttle = { ...state.shuttles[shuttleIndex] };
          resolve({
            shuttle: {
              ...exShuttle,
              on: exShuttle.bookings.map(b => b.riderId).indexOf(state.user._id) !== -1,
              taken: sum(exShuttle.bookings, b => b.amount)
            }
          });
        } else {
          get(`shuttles/${id}`).then((shuttle) => {
            resolve({
              shuttle: {
                ...shuttle,
                on: shuttle.bookings.map(b => b.riderId).indexOf(state.user._id) !== -1,
                taken: sum(shuttle.bookings, b => b.amount)
              }
            });
          });
        }
      }
    });
  },

  hopOn(state, amount) {
    return new Promise((resolve, reject) => {
      post(`shuttles/${state.shuttle._id}/hopon`, { amount })
        .then(get(`shuttles/${state.shuttle._id}`))
        .then((shuttle) => {
          resolve({
            shuttle: {
              ...shuttle,
              on: shuttle.bookings.map(b => b.riderId).indexOf(state.user._id) !== -1,
              taken: sum(shuttle.bookings, b => b.amount)
            }
          });
        });
    });
  },

  hopOff(state) {
    return new Promise((resolve, reject) => {
      post(`shuttles/${state.shuttle._id}/hopoff`)
        .then(get(`shuttles/${state.shuttle._id}`))
        .then((shuttle) => {
          resolve({
            shuttle: {
              ...shuttle,
              on: shuttle.bookings.map(b => b.riderId).indexOf(state.user._id) !== -1,
              taken: sum(shuttle.bookings, b => b.amount)
            }
          });
        });
    });
  },

  getBookings(state) {
    return new Promise((resolve, reject) => {
      if (!state.user) {
        resolve(state);
      } else {
        get(`riders/${state.user._id}/shuttles`).then(bookings => resolve({ bookings }));
      }
    });
  }
});

export default shuttlesActions;