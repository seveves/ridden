import { get, post, put, del } from '../api';

const carsActions = store => ({
  getCar(state, id) {
    return new Promise((resolve, reject) => {
      if (!id) {
        resolve({
          car: {
            max: 10,
            name: '',
            description: ''
          }
        });
      } else {
        const carIndex = state.cars.findIndex(c => c._id === id);
        if (carIndex !== -1) {
          const exCar = { ...state.cars[carIndex] };
          resolve({ car: exCar });
        } else {
          get(`cars/${id}`).then(car => resolve({ car }));
        }
      }
    });
  },

  createCar(state, car) {
    return new Promise((resolve, reject) => {
      post('cars', { ...car })
        .then(newCar => resolve({ car: newCar, cars: [ ...state.cars, newCar ] }));
    });
  },

  updateCar(state, id, car) {
    return new Promise((resolve, reject) => {
      put(`cars/${id}`, { ...car }).then((updateCar) => {
        const carIndex = state.cars.findIndex(c => c._id === id);
        const cars = [
          ...state.cars.slice(0, carIndex),
          updatedCar,
          ...state.cars.slice(carIndex + 1)
        ];
        resolve({ car: updatedCar, cars });
      });
    });
  },

  deleteCar(state, id) {
    return new Promise((resolve, reject) => {
      const carIndex = state.cars.findIndex(c => c._id === id);
      const cars = [
        ...state.cars.slice(0, carIndex),
        ...state.cars.slice(carIndex + 1)
      ];
      del(`cars/${id}`).then(() => {
        store.setState({ car: null, cars });
        history.back();
        resolve();
      });
    });
  },

 getCars(state) {
   return new Promise((resolve, reject) => {
     get(`cars`).then(cars => resolve({ cars }));
   });
  }
});

export default carsActions;