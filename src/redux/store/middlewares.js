// ======================================================
// 配置中间件
// ======================================================
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';

const middlewares = [thunk];

if (__DEV__) {
  middlewares.push(createLogger());
}

export default middlewares;
