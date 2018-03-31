import createStore from 'unistore';

import { getUser } from '../utils/local';

import userActions from './user';
import carsActions from './cars';
import offersActions from './offers';
import shuttlesActions from './shuttles';

const initialState = {
  cars: [],
  shuttles: [],
  shuttle: null,
  bookings: [],
  offers: [],
  offer: null,
  user: getUser()
};

function combineActions(...actions) {
  return (...args) => Object.assign(...actions.map(a => a(...args)));
}

const _store = createStore(initialState);
const _actions = combineActions(
  userActions,
  carsActions,
  offersActions,
  shuttlesActions
);

export const store = _store;
export const actions = _actions;
