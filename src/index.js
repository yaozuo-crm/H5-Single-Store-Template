import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {
  HashRouter as Router,
} from 'react-router-dom';

import routes from 'ROUTE';
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
