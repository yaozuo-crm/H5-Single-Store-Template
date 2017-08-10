import xhr from './xhr/';
// import store from '@/store';
// import router from '@/routes';

/**
 * 用户认证所用到的 API
 */
class AuthService {

    /**
     * 检测当前用户是否已经登录
     * @resolve {Object} userData / null
     */
  static checkLogin() {
    return xhr({
      url: '/auth/checkLogin',
    });
  }

    /**
     * 登录
     * @param  {String} userData.username
     * @param  {String} userData.password
     * @return {Object} userData
     */
  static login(userData) {
    return xhr({
      method: 'post',
      url: '/login', // '/auth/login',
      body: userData,
    });
  }

    /**
     * 注销登录
     * @return {Promise}
     */
  static logout() {
    return xhr({
      url: '/auth/logout',
    });
  }

  /* eslint-disable */
  documents() {
    return xhr({
      url: '/documents',
    });
  }

  add(data) {
      return xhr({
        method: 'post',
        url: '/add',
        body: data,
      });
  }

  delete(data) {
      return xhr({
        method: 'post',
        url: '/delete',
        body: data,
      });
  }

}

// 实例化后导出，全局单例
export default new AuthService();
