import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import { createBrowserHistory } from 'history';
import { Provider } from 'mobx-react';
import { Router } from 'react-router';
import StaffStore from './stores/StaffStore';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthService from './services/authService';
import ProductsService from './services/productsService';
import ProductStore from './stores/ProductStore';

const services: any = {};
const stores: any = {
};

stores.routerStore = new RouterStore();
const browserHistory = createBrowserHistory();
const history = syncHistoryWithStore(browserHistory, stores.routerStore);

services.productsService = new ProductsService(stores.routerStore);
services.authService = new AuthService(stores.routerStore);

stores.productsStore = new ProductStore(services.tasksService);
stores.userStore = new StaffStore(services.authService);

ReactDOM.render(
  <Provider {...stores}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
