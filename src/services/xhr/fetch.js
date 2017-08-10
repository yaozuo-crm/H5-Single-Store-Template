// const rootPath = 'http://172.16.2.19:8000';
const rootPath = 'http://localhost:8002/api'; // 后端 API 根路径

// function buildParams(obj) {
//   if (!obj) {
//     return '';
//   }
//   const params = [];
//     // eslint-disable-next-line no-restricted-syntax
//   for (const key in obj) {
//     if ({}.hasOwnProperty.call(obj, key)) {
//       const value = obj[key] === undefined ? '' : obj[key];
//       params.push(`${key}=${value}`);
//     }
//   }
//
//   return params.join('&');
// }

const xhr = ({
    method = 'get',
    url,
    body = null,
}) => {
  const options = {
    method,
    headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Type': 'application/json',
    //   Token: localStorage.getItem('token') || 0,
    },
  };

  if (body) {
    // options.body = buildParams(body);
    options.body = JSON.stringify(body);
  }

  return fetch(rootPath + url, options)
        .then(response => response.json())
        .then(json => Promise.resolve(json))
        .catch(() => new Promise((resolve, reject) => {
          reject('该ID已被注册');
        }));
};

export default xhr;
