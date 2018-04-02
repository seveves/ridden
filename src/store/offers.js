import { get, post, put, del } from '../api';
import { bus } from '../utils';

const offersActions = store => ({
  getOffers(state) {
    return new Promise((resolve, reject) => {
      if (!state.user) {
        resolve(state);
      } else {
        if (!state.cars || state.cars.length === 0) {
          get(`cars`).then((cars) => {
            get(`vendors/${state.user.vendorId}/shuttles`)
              .then(
                offers => resolve({ cars, offers }),
                err => bus.emit('alert:new', { type: 'fail', title: 'Fetching offers failed', message: err, dismissable: true })
              );
          },
          err => bus.emit('alert:new', { type: 'fail', title: 'Fetching offers failed', message: err, dismissable: true })
          );
        } else {
          get(`vendors/${state.user.vendorId}/shuttles`)
            .then(
              offers => resolve({ offers }),
              err => bus.emit('alert:new', { type: 'fail', title: 'Fetching offers failed', message: err, dismissable: true })
            );
        }
      }
    });
  },

  getOffer(state, id) {
    return new Promise((resolve, reject) => {
      if (!id) {
        const initOffer = {
          title: '',
          description: '',
          type: 'OneWay',
          duration: 2,
          max: 10,
          min: 2,
          carId: null,
          departure: new Date(),
          location: {
            name: '',
            long: 10,
            lat: 10
          }
        };
        if (!state.cars || state.cars.length === 0) {
          get(`cars`).then(
            cars  => resolve({ cars, offer: initOffer }),
            err => bus.emit('alert:new', { type: 'fail', title: 'Fetching offer failed', message: err, dismissable: true })
          );
        } else {
          resolve({ offer: initOffer });
        }
      } else {
        const offerIndex = state.offers.findIndex(o => o._id === id);
        if (offerIndex !== -1) {
          const exOffer = { ...state.offers[offerIndex] };
          if (!state.cars || state.cars.length === 0) {
            get(`cars`).then(
              cars  => resolve({ offer: exOffer }),
              err => bus.emit('alert:new', { type: 'fail', title: 'Fetching offer failed', message: err, dismissable: true })
            );
          } else {
            resolve({ offer: exOffer });
          }
        } else {
          if (!state.cars || state.cars.length === 0) {
            get(`cars`).then((cars) => {
              get(`shuttles/${id}`).then(
                offer => resolve({ cars, offer }),
                err => bus.emit('alert:new', { type: 'fail', title: 'Fetching offer failed', message: err, dismissable: true })
              );
            },
            err => bus.emit('alert:new', { type: 'fail', title: 'Fetching offer failed', message: err, dismissable: true })
          );
          } else {
            get(`shuttles/${id}`).then(
              offer => resolve({ offer }),
              err => bus.emit('alert:new', { type: 'fail', title: 'Fetching offer failed', message: err, dismissable: true })
            );
          }
        }
      }
    });
  },

  createOffer(state, offer) {
    return new Promise((resolve, reject) => {
      post('shuttles', { ...offer })
        .then(
          newOffer => {
            bus.emit('alert:new', { type: 'ok', title: 'Created offer', message: `Shuttle offer "${newOffer.title}" created.` });
            resolve({ offer: newOffer, offers: [ ...state.offers, newOffer ] });
          },
          err => bus.emit('alert:new', { type: 'fail', title: 'Creating offer failed', message: err, dismissable: true })
        );
    });
  },

  updateOffer(state, id, offer) {
    return new Promise((resolve, reject) => {
      put(`shuttles/${id}`, { ...offer }).then((updatedOffer) => {
        const offerIndex = state.offers.findIndex(o => o._id === id);
        const offers = [
          ...state.offers.slice(0, offerIndex),
          updatedOffer,
          ...state.offers.slice(offerIndex + 1)
        ];
        bus.emit('alert:new', { type: 'ok', title: 'Updated offer', message: `Shuttle offer "${updatedOffer.title}" updated.` });
        resolve({ offer: updatedOffer, offers });
      },
      err => bus.emit('alert:new', { type: 'fail', title: 'Updating offer failed', message: err, dismissable: true })
    );
    });
  },

  deleteOffer(state, id) {
    return new Promise((resolve, reject) => {
      const offerIndex = state.offers.findIndex(o => o._id === id);
      const offers = [
        ...state.offers.slice(0, offerIndex),
        ...state.offers.slice(offerIndex + 1)
      ];
      del(`shuttles/${id}`).then(() => {
        store.setState({ offer: null, offers });
        history.back();
        bus.emit('alert:new', { type: 'ok', title: 'Deleted offer', message: 'Shuttle offer deleted.' });
        resolve();
      },
      err => bus.emit('alert:new', { type: 'fail', title: 'Deleting offer failed', message: err, dismissable: true })
      );
    });
  },
});

export default offersActions;