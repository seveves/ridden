import { get, post, put, del } from '../api';
import { bus } from '../utils';

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
          get(`cars/${id}`)
            .then(
              car => resolve({ car }),
              err => bus.emit('alert:new', { type: 'fail', title: 'Fetching car failed', message: err, dismissable: true }));
        }
      }
    });
  },

  createCar(state, car) {
    return new Promise((resolve, reject) => {
      post('cars', { ...car })
        .then(newCar => {
          bus.emit('alert:new', { type: 'ok', title: 'Car created', message: `Car "${newCar.name}" created.` });
          resolve({ car: newCar, cars: [ ...state.cars, newCar ] });
        },
        err => bus.emit('alert:new', { type: 'fail', title: 'Creating car failed', message: err, dismissable: true }));
      });
  },

  updateCar(state, id, car) {
    return new Promise((resolve, reject) => {
      put(`cars/${id}`, { ...car }).then((updateCar) => {
        const carIndex = state.cars.findIndex(c => c._id === id);
        const cars = [
          ...state.cars.slice(0, carIndex),
          updateCar,
          ...state.cars.slice(carIndex + 1)
        ];
        bus.emit('alert:new', { type: 'ok', title: 'Car updated', message: `Car "${updateCar.name}" updated.` });
        resolve({ car: updateCar, cars });
      },
      err => bus.emit('alert:new', { type: 'fail', title: 'Updating car failed', message: err, dismissable: true }));
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
        bus.emit('alert:new', { type: 'ok', title: 'Car deleted', message: `Car deleted.` });
        resolve();
      },
      err => bus.emit('alert:new', { type: 'fail', title: 'Deleting car failed', message: err, dismissable: true }));
    });
  },

 getCars(state) {
   return new Promise((resolve, reject) => {
     get(`cars`).then(
      cars => resolve({ cars }),
      err => bus.emit('alert:new', { type: 'fail', title: 'Fetching cars failed', message: err, dismissable: true }));       
   });
  }
});

export default carsActions;