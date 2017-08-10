import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {ADD_TODO, COMPLETE_TODO, SET_VISIBILITY_FILTER, VisibilityFilters} from 'ACTION';
import store from 'STORE';
import userReducer from 'REDUCER/user';
import {selectedSubreddit, postsBySubreddit} from './async';


// ================================
// 同步的 Reducers（即应用初始化所必需的）
// ================================
const syncReducers = {
  router: routerReducer,
  userData: userReducer,
};

// ================================
// 异步加载的 Reducers（Code Splitting 按需加载的）
// ================================
const asyncReducers = {};


const {SHOW_ALL} = VisibilityFilters;

function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter;
    default:
      return state;
  }
}

function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
          completed: false,
        },
      ];
    case COMPLETE_TODO:
      return [
        ...state.slice(0, action.index),
        Object.assign({}, state[action.index], {
          completed: true,
        }),
        ...state.slice(action.index + 1),
      ];
    default:
      return state;
  }
}

const todoApp = combineReducers({
  visibilityFilter,
  todos,
  selectedSubreddit,
  postsBySubreddit,
});

export default todoApp;


/**
 * @return {Function} rootReducer
 */
export function createRootReducer() {
  return combineReducers({
    ...syncReducers,
    ...asyncReducers,
    visibilityFilter,
    todos,
    selectedSubreddit,
    postsBySubreddit,
  });
}

/**
 * 按需加载时，立即注入对应的 Reducer
 * @param  {String}   key
 * @param  {Function} reducer
 */
export function injectReducer(key, reducer) {
  asyncReducers[key] = reducer;
  store.replaceReducer(createRootReducer()); // 替换当前的 rootReducer
}
