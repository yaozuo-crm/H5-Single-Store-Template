import authService from 'SERVICE/authService';
import {message} from 'antd';
const LOG_IN = 'LOG_IN';
const LOG_OUT = 'LOG_OUT';

const loginDone = userData => ({
  type: LOG_IN,
  payload: userData,
});

const login = da => dispatch => {
  authService
    .constructor
    .login(da.formData)
    .then(data => {
      if (data.success) {
        dispatch(loginDone(data));
        localStorage.setItem('pid', data.pid);
        localStorage.setItem('token', data.token);
        message.success('登录成功');
        da.history.push('/dashboard');
      } else {
        message.error(data.info);
      }
    });
};

const checkLogin = () => dispatch => {
  authService
      .constructor
      .checkLogin()
      .then(re => {
        if (!re) return;
        dispatch(loginDone(re));
      });
};

const logout = da => dispatch => {
  da.history.push('/');
  localStorage.removeItem('pid');
  localStorage.removeItem('token');
  dispatch({
    type: LOG_OUT,
  });
  // authService
  //     .constructor
  //     .logout()
  //     .then(() =>
  //       dispatch({
  //         type: LOG_OUT,
  //       })
  //     );
};

export default {
  login, checkLogin, logout,
};

export const ACTION_HANDLERS = {
  [LOG_IN]: (userData, {payload}) => payload,
  [LOG_OUT]: () => null,
};
