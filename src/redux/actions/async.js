import fetch from 'isomorphic-fetch';
// import {createAction} from 'redux-actions';

// const rootPath = 'http://localhost:8002/api'; // 后端 API 根路径

export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT';
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT';

export function selectSubreddit(subreddit) {
  return {
    type: SELECT_SUBREDDIT,
    subreddit,
  };
}

export function invalidateSubreddit(subreddit) {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit,
  };
}

// const requestPosts = createAction('REQUEST_POSTS');
function requestPosts(subreddit) {
  return {
    type: REQUEST_POSTS,
    subreddit,
  };
}

// const receivePosts = createAction(
//     'RECEIVE_POSTS',
//     (subreddit, json) => {
//       console.log(subreddit, json);

//       return {
//         subreddit,
//         posts: json.data.children.map(child => child.data),
//         receivedAt: Date.now(),
//       };
//     }
// );

function receivePosts(subreddit, json) {
  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now(),
  };
}

function fetchPosts(subreddit) {
  return dispatch => {
    dispatch(requestPosts(subreddit));

    return fetch(`https://www.reddit.com/r/${subreddit}.json`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(subreddit, json)));
  };
}

function shouldFetchPosts(state, subreddit) {
  const posts = state.postsBySubreddit[subreddit];
  if (!posts) {
    return true;
  } else if (posts.isFetching) {
    return false;
  }

  return posts.didInvalidate;
}

export function fetchPostsIfNeeded(subreddit) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), subreddit)) {
      return dispatch(fetchPosts(subreddit));
    }

    return false;
  };
}
