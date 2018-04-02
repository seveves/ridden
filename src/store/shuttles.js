import { get, post, put, del } from '../api';
import { bus, sum } from '../utils';

const shuttlesActions = store => ({
  getShuttles(state, params) {
    return new Promise((resolve, reject) => {
      get(`shuttles${params}`).then(
        shuttles => resolve({ shuttles }),
        err => bus.emit('alert:new', { type: 'fail', title: 'Fetching shuttles failed', message: err, dismissable: true })
      );
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
          },
          err => bus.emit('alert:new', { type: 'fail', title: 'Fetching shuttle failed', message: err, dismissable: true })
        );
        }
      }
    });
  },

  hopOn(state, amount) {
    return new Promise((resolve, reject) => {
      post(`shuttles/${state.shuttle._id}/hopon`, { amount })
        .then(get(`shuttles/${state.shuttle._id}`))
        .then((shuttle) => {
          bus.emit('alert:new', { type: 'ok', title: 'Good ride' , message: 'Have fun on this ride!' });
          resolve({
            shuttle: {
              ...shuttle,
              on: shuttle.bookings.map(b => b.riderId).indexOf(state.user._id) !== -1,
              taken: sum(shuttle.bookings, b => b.amount)
            }
          });
        },
        err => bus.emit('alert:new', { type: 'fail', title: 'Hop on failed', message: err, dismissable: true })
      );
    });
  },

  hopOff(state) {
    return new Promise((resolve, reject) => {
      post(`shuttles/${state.shuttle._id}/hopoff`)
        .then(get(`shuttles/${state.shuttle._id}`))
        .then((shuttle) => {
          bus.emit('alert:new', { type: 'ok', title: 'See you' , message: 'See you next time. Take care!' });
          resolve({
            shuttle: {
              ...shuttle,
              on: shuttle.bookings.map(b => b.riderId).indexOf(state.user._id) !== -1,
              taken: sum(shuttle.bookings, b => b.amount)
            }
          });
        },
        err => bus.emit('alert:new', { type: 'fail', title: 'Hop off failed', message: err, dismissable: true })
      );
    });
  },

  getBookings(state) {
    return new Promise((resolve, reject) => {
      if (!state.user) {
        resolve(state);
      } else {
        get(`riders/${state.user._id}/shuttles`).then(
          bookings => resolve({ bookings }),
          err => bus.emit('alert:new', { type: 'fail', title: 'Fetching bookings failed', message: err, dismissable: true })
        );
      }
    });
  }
});

export default shuttlesActions;