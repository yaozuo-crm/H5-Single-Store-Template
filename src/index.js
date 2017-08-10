import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter as Router,
} from 'react-router-dom';

import {Provider} from 'react-redux';
// import {createStore} from 'redux';
// import todoApp from 'REDUCER';

import routes from 'ROUTE';

// import configureStore from '.redux/store/configureStore';

// Grab the state from a global variable injected into the server-generated HTML
// const preloadedState = window.__PRELOADED_STATE__;

// Allow the passed state to be garbage-collected
// delete window.__PRELOADED_STATE__;

// const store = configureStore();
import store from 'STORE';

if (__DEV__) {
  console.info('[当前环境] 开发环境');
}
if (__PROD__) {
  console.info('[当前环境] 生产环境');
}

const MOUNT_NODE = document.getElementById('app');

ReactDOM.render(
  <Provider store={store}>
    <Router>{routes}</Router>
  </Provider>,
  MOUNT_NODE
);
