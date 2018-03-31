import './style';
import 'normalize.css';
import { Provider } from 'unistore/preact';
import App from './components/app';

import { store } from './store';

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
)
