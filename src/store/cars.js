import { get, post, put, del } from '../api';

const carsActions = store => ({
  async getCar(state, id) {
    if (!id) {
      return {
        car: {
          max: 10,
          name: '',
          description: ''
        }
      };
    }
    const carIndex = state.cars.findIndex(c => c._id === id);
    if (carIndex !== -1) {
      const exCar = { ...state.cars[carIndex] };
      return {
        car: exCar
      };
    }
    const car = await get(`cars/${id}`);
    return { car };
  },

  async createCar(state, car) {
    const newCar = await post('cars', { ...car });
    return { car: newCar, cars: [ ...state.cars, newCar ] };
  },

  async updateCar(state, id, car) {
    const updatedCar = await put(`cars/${id}`, { ...car });
    const carIndex = state.cars.findIndex(c => c._id === id);
    const cars = [
      ...state.cars.slice(0, carIndex),
      updatedCar,
      ...state.cars.slice(carIndex + 1)
    ];
    return { car: updatedCar, cars };
  },

  async deleteCar(state, id) {
    const carIndex = state.cars.findIndex(c => c._id === id);
    const cars = [
      ...state.cars.slice(0, carIndex),
      ...state.cars.slice(carIndex + 1)
    ];
    await del(`cars/${id}`);
    store.setState({ car: null, cars });
    history.back();
  },

  async getCars(state) {
    const cars = await get(`cars`);
    return { cars };
  }
});

export default carsActions;