import { get, post, put, del } from '../api';

const offersActions = store => ({
  async getOffers(state) {
    if (!state.user) {
      return state;
    }
    const offers = await get(`vendors/${state.user.vendorId}/shuttles`);
    return { offers };
  },

  async getOffer(state, id) {
    if (!id) {
      return {
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
      };
    }
    const offerIndex = state.offers.findIndex(o => o._id === id);
    if (offerIndex !== -1) {
      const exOffer = { ...state.offers[offerIndex] };
      return {
        offer: exOffer
      };
    }
    const offer = await get(`shuttles/${id}`);
    return { offer };
  },

  async createOffer(state, offer) {
    const newOffer = await post('shuttles', { ...offer });
    return { offer: newOffer, offers: [ ...state.offers, newOffer ] };
  },

  async updateOffer(state, id, offer) {
    const updatedOffer = await put(`shuttles/${id}`, { ...offer });
    const offerIndex = state.offers.findIndex(o => o._id === id);
    const offers = [
      ...state.offers.slice(0, offerIndex),
      updatedOffer,
      ...state.offers.slice(offerIndex + 1)
    ];
    return { offer: updatedOffer, offers };
  },

  async deleteOffer(state, id) {
    const offerIndex = state.offers.findIndex(o => o._id === id);
    const offers = [
      ...state.offers.slice(0, offerIndex),
      ...state.offers.slice(offerIndex + 1)
    ];
    await del(`shuttles/${id}`);
    store.setState({ offer: null, offers });
    history.back();
  },
});

export default offersActions;