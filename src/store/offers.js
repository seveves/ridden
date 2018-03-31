import { get, post, put, del } from '../api';

const offersActions = store => ({
  getOffers(state) {
    return new Promise((resolve, reject) => {
      if (!state.user) {
        resolve(state);
      } else {
        get(`vendors/${state.user.vendorId}/shuttles`)
          .then(offers => resolve({ offers }));
      }
    });
  },

  getOffer(state, id) {
    return new Promise((resolve, reject) => {
      if (!id) {
        resolve({
          offer: {
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
          }
        });
      } else {
        const offerIndex = state.offers.findIndex(o => o._id === id);
        if (offerIndex !== -1) {
          const exOffer = { ...state.offers[offerIndex] };
          resolve({ offer: exOffer });
        } else {
          get(`shuttles/${id}`).then(offer => resolve({ offer }));
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