# H5-Single-Store-Template
【小雅CRM】【H5】单店版模板前端框架

> 注：现在接口用的是我nodejs写的一个本地后端



### 技术栈

- [ ] #### react

- [ ] #### redux

- [ ] #### react-redux

- [ ] #### react-router-dom@4.x

- [ ] #### isomorphic-fetch

- [ ] #### es6

- [ ] #### webpack@2.x

- [ ] #### antd-mobile

- [ ] #### eslint



### 第一步、

```Shell
$ npm install # 安装依赖包
```

### 第二步、

```shell
$ npm run dev # 开发/预览
```

### 打包、

```Shell
$ npm run build
```


## 目录结构

```
.
├── config/              # Webpack和postcss 配置目录
├── dist/                # build 生成的生产环境下的项目
├── src/                 # 源码目录（开发都在这里进行）
│   ├── assets/          # 放置需要经由 Webpack 处理的静态文件
│   ├── components/      # UI组件
│   ├── containers/      # 容器组件
│   ├── plugins/         # 插件库
│   ├── redux/           # 状态管理
│   ├── services/        # 服务（统一管理 XHR 请求）
│   ├── style/           # 通用样式库
│   ├── utils/           # 工具类
│   ├── views/           # （待定）路由页面组件
│   ├── index.js         # 入口文件
│   ├── index.html       # 静态基页
│   ├── routers.jsx      # 路由配置
├── .babelrc             # Babel 转码配置
├── .eslintignore        # （配置）ESLint 检查中需忽略的文件（夹）
├── .eslintrc            # ESLint 配置
├── .gitignore           # （配置）需被 Git 忽略的文件（夹）
├── new.js               # 快速创建UI组件脚本
├── package.json
```



#### `src/components/`

- 只负责 UI 的呈现，不带有任何业务逻辑
- 没有状态（即不使用`this.state`这个变量）
- 所有数据都由参数（`this.props`）提供
- 不使用任何 Redux 的 API

> 因为不含有状态，UI 组件又称为"纯组件"，即与纯函数一样，纯粹由参数决定它的值。

#### `src/containers/`

- 负责管理数据和业务逻辑，不负责 UI 的呈现
- 带有内部状态
- 使用 Redux 的 API

> 总之，只要记住一句话就可以了：UI 组件负责 UI 的呈现，容器组件负责管理数据和逻辑。
>
> 你可能会问，如果一个组件既有 UI 又有业务逻辑，那怎么办？回答是，将它拆分成下面的结构：外面是一个容器组件，里面包了一个UI 组件。前者负责与外部的通信，将数据传给后者，由后者渲染出视图。
>
> React-Redux 规定，所有的 UI 组件都由用户提供，容器组件则是由 React-Redux 自动生成。也就是说，用户负责视觉层，状态管理则是全部交给它。