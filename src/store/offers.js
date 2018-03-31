import { get, post, put, del } from '../api';

const offersActions = store => ({
  getOffers(state) {
    return new Promise((resolve, reject) => {
      if (!state.user) {
        resolve(state);
      } else {
        if (!state.cars || state.cars.length === 0) {
          get(`cars`).then((cars) => {
            get(`vendors/${state.user.vendorId}/shuttles`)
              .then((offers) => {
                resolve({ cars, offers });
              });
          })
        } else {
          get(`vendors/${state.user.vendorId}/shuttles`)
            .then(offers => resolve({ offers }));
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
          get(`cars`).then(cars  => resolve({ cars, offer: initOffer }));
        } else {
          resolve({ offer: initOffer });
        }
      } else {
        const offerIndex = state.offers.findIndex(o => o._id === id);
        if (offerIndex !== -1) {
          const exOffer = { ...state.offers[offerIndex] };
          if (!state.cars || state.cars.length === 0) {
            get(`cars`).then(cars  => resolve({ offer: exOffer }));
          } else {
            resolve({ offer: exOffer });
          }
        } else {
          if (!state.cars || state.cars.length === 0) {
            get(`cars`).then((cars) => {
              get(`shuttles/${id}`).then(offer => resolve({ cars, offer }));
            });
          } else {
            get(`shuttles/${id}`).then(offer => resolve({ offer }));
          }
        }
      }
    });
  },

  createOffer(state, offer) {
    return new Promise((resolve, reject) => {
      post('shuttles', { ...offer })
        .then(newOffer => resolve({ offer: newOffer, offers: [ ...state.offers, newOffer ] }));
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
        resolve({ offer: updatedOffer, offers });
      });
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
        resolve();
      });
    });
  },
});

export default offersActions;