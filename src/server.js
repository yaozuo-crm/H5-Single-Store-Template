// const qs = require('qs');
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
// const React = require('react');
// const {createStore} = require('redux');
// const {Provider} = require('react-redux');
// const {renderToString} = require('react-dom/server');
// const counterApp = require('./reducers');
// const {fetchCounter} = require('./api/counter');
// const App = require('./containers/App');
const CORS = require('./middlewares/CORE.js');
const DB_CONN_STR = 'mongodb://localhost:27017/test'; // 数据库为 test

const app = express();

app.use(CORS);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Serve static files
// app.use('/static', express.static('static'));

// function renderFullPage(html, preloadedState) {
//   return `
//     <!doctype html>
//     <html>
//       <head>
//         <meta http-equiv="X-UA-Compatible" content="IE=edge" />
//         <meta charset="UTF-8" />
//         <meta name="viewport" content="width=device-width, initial-scale=1.0001, minimum-scale=1.0001, maximum-scale=1.0001, user-scalable=no" />
//         <meta name="format-detection" content="telephone=no" />
//         <link rel="icon" href="favicon.png" type="image/x-icon">
//         <title>Redux Universal Example</title>
//       </head>
//       <body>
//         <div id="root">${html}</div>
//         <script>
//           // WARNING: See the following for security issues around embedding JSON in HTML:
//           // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
//           window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
//         </script>
//         <script src="/static/bundle.js"></script>
//       </body>
//     </html>
//     `;
// }

// We are going to fill these out in the sections to follow
// function handleRender(req, res) {
//     // Query our mock API asynchronously
//   fetchCounter(apiResult => {
//       // Read the counter from the request, if provided
//     const params = qs.parse(req.query);
//     const counter = parseInt(params.counter, 10) || 0;
//
//       // Compile an initial state
//     const preloadedState = {counter};
//
//       // Create a new Redux store instance
//     const store = createStore(counterApp, preloadedState);
//
//       // Render the component to a string
//     const html = renderToString(
//       <Provider store={store}>
//         <App />
//       </Provider>
//       );
//
//       // Grab the initial state from our Redux store
//     const finalState = store.getState();
//
//       // Send the rendered page back to the client
//     res.send(renderFullPage(html, finalState));
//   });
// }

const insertData = (db, name = 'addlist', data = {}, callback) => {
    // 连接到表 addlist
  const collection = db.collection(name);

  collection.insert(data, (err, result) => {
    if (err) {
      console.log(`Error:${err}`);

      return;
    }
    callback(result);
  });
};

const searchData = (db, name = 'addlist', whereStr = {}, callback) => {
    // 连接到表
  const collection = db.collection(name);
    // 查询数据
  collection.find(whereStr).toArray((err, result) => {
    if (err) {
      console.log(`Error:${err}`);

      return;
    }
    callback(result);
  });
};

// const updateData = (db, callback) => {
//     // 连接到表
//   const collection = db.collection('addlist');
//     // 更新数据
//   const whereStr = {
//     type: 'mongo01',
//   };
//   const updateStr = {
//     $set: {
//       type: 'mongo001',
//     },
//   };
//   collection.update(whereStr, updateStr, (err, result) => {
//     if (err) {
//       console.log(`Error:${err}`);
//
//       return;
//     }
//     callback(result);
//   });
// };

const delData = (db, name = 'addlist', whereStr = {}, callback) => {
    // 连接到表
  const collection = db.collection(name);
    // 删除数据
  collection.remove(whereStr, (err, result) => {
    if (err) {
      console.log(`Error:${err}`);

      return;
    }
    callback(result);
  });
};


const addUser = (db, name = 'user', data = {}, callback) => {
    // 连接到表 user
  const collection = db.collection(name);

  collection.insert(data, (err, result) => {
    if (err) {
      console.log(`Error:${err}`);

      return;
    }
    callback(result);
  });
};

const getUser = (db, name = 'user', whereStr = {}, callback) => {
    // 连接到表
  const collection = db.collection(name);
    // 查询数据
  collection.find(whereStr).toArray((err, result) => {
    if (err) {
      console.log(`Error:${err}`);

      return;
    }
    callback(result);
  });
};

app.get('/api/documents', (req, res) => {
  MongoClient.connect(DB_CONN_STR, (err, db) => {
    if (err) {
      console.log(`Error:${err}`);
    }

    searchData(db, 'documents', {}, result => {
      console.log('查询成功！');

      res.json(result);
      db.close();
    });
  });
});

app.post('/api/add', (req, res) => {
  const data = req.body;

  MongoClient.connect(DB_CONN_STR, (err, db) => {
    if (err) {
      console.log(`Error:${err}`);
    }

    insertData(db, 'documents', data, result => {
      console.log('=== 插入成功 ===', result);

      searchData(db, 'documents', {}, result2 => {
        res.json(result2);
        db.close();
      });
    });
  });
});

app.post('/api/delete', (req, res) => {
  const key = req.body;
  console.log(key);

  MongoClient.connect(DB_CONN_STR, (err, db) => {
    if (err) {
      console.log(`Error:${err}`);
    }

    delData(db, 'documents', key, result => {
      console.log('=== 删除成功 ===', result);

      searchData(db, 'documents', {}, result2 => {
        res.json(result2);
        db.close();
      });
    });
  });
});


app.post('/api/register', (req, res) => {
  const data = req.body;

  MongoClient.connect(DB_CONN_STR, (err, db) => {
    if (err) {
      console.log(`Error:${err}`);
    }

    addUser(db, 'user', data, result => {
      console.log('=== 插入成功 ===', result);

      searchData(db, 'user', {}, result2 => {
        res.json(result2);
        db.close();
      });
    });
  });
});

app.post('/api/login', (req, res) => {
  const data = req.body;

  MongoClient.connect(DB_CONN_STR, (err, db) => {
    if (err) {
      console.log(`Error:${err}`);
    }

    getUser(db, 'user', data, result => {
      console.log('查询成功！', result);

      if (result.length === 0) {
        res.json({
          success: false,
          info: '用户名或密码错误',
        });
      } else {
        res.json({
          success: true,
          pid: result[0].pid,
          token: '320199209892829',
        });
      }
      db.close();
    });
  });
});

// MongoClient.connect(DB_CONN_STR, function(err, db) {
//     console.log("连接成功！");
//     // insertData(db, function(result) {
//     //   console.log(result);
//     //   db.close();
//     // });
//     // searchData(db, function(result) {
//     //   console.log(result);
//     //   db.close();
//     // });
//     // updateData(db, function(result) {
//     //   console.log(result);
//     //   db.close();
//     // });
//     // delData(db, function(result) {
//     //   console.log(result);
//     //   db.close();
//     // });
// });

// This is fired every time the server side receives a request
// app.use(handleRender);

app.listen(8002, () => {
  console.log('react app listening on port 8002!');
});
