import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
// import rootReducer from './reducers/async';
import todoApp from 'REDUCER';

const loggerMiddleware = createLogger();

export default function configureStore(preloadedState) {
  return createStore(
    todoApp,
    preloadedState,
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    )
  );
}
