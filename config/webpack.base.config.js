const path = require('path');
const webpack = require('webpack');
const postcssConfig = require('./postcss.config');
const NyanProgressPlugin = require('nyan-progress-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

process.noDeprecation = true;

const env = process.env.NODE_ENV.trim(); // 当前环境

const PATHS = {
  DEV: path.join(process.cwd(), 'src'),
  PROD: path.join(process.cwd(), 'dist'),
};

// svg
const svgSpriteDirs = [
  require.resolve('antd-mobile').replace(/warn\.js$/, ''), // antd-mobile 内置svg
  // path.resolve(__dirname, 'src/assets/img'),  // 业务代码本地私有 svg 存放目录
];

module.exports = {
  context: PATHS.DEV, // webpack 的主目录，entry 和 module.rules.loader 选项相对于此目录解析
  entry: {
    vendor: [
      'react',
    ],
    index: './index.js',
  },
  output: {
    path: PATHS.PROD,
    filename: `[name]${process.env.NODE_ENV === 'development' ? '' : '[chunkhash:8]'}.js`,
  },
  module: {
    rules: [{
      test: /\.html$/,
      use: 'html-loader',
    },
    {
      test: /\.svg$/,
      loader: 'svg-sprite-loader',
      include: svgSpriteDirs,
    },
    {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
      },
      {
        loader: 'eslint-loader',
        options: {
          failOnWarning: true,
          failOnError: true,
        },
      },
      ],
    },
    {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader',
      ],
    },
    {
      test: /\.less$/,
      use: [
        'style-loader',
        'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]--[hash:base64:5]',
        {
          loader: 'postcss-loader',
          options: postcssConfig,
        },
        'less-loader',
      ],
    },
    {
      test: /\.s[a|c]ss$/,
      use: [
        'style-loader',
        'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]--[hash:base64:5]',
        {
          loader: 'postcss-loader',
          options: postcssConfig,
        },
        'sass-loader',
      ],
    },
    {
      test: /\.(ttf|eot|woff(2)?)(\?[a-z0-9=&.]+)?$/,
      use: 'file-loader?limit=1024&name=assets/font/[name].[ext]',
    },
    {
      test: /\.(jpg|jpeg|png|gif)$/,
      use: 'url-loader?mimetype=image/png&name=assets/img/[name]-[hash:6].[ext]',
    },
    ],
  },
  resolve: {
    mainFiles: ['index.web', 'index'], // 这里哦
    modules: ['app', 'node_modules', path.join(__dirname, '../node_modules')],
    extensions: [
      '.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.ts', '.tsx',
      '.js',
      '.jsx',
      '.react.js',
    ],
    mainFields: [
      'browser',
      'jsnext:main',
      'main',
    ],
    alias: {
      '@': PATHS.DEV,
      ASSET: '@/assets',
      COMPONENT: '@/components',
      ROUTE: '@/routes',
      SERVICE: '@/services',
      ACTION: '@/redux/actions',
      REDUCER: '@/redux/reducers',
      STORE: '@/redux/store',
      STYLE: '@/styles',
      UTIL: '@/utils',
      VIEW: '@/views',
    },
  },
  plugins: [
    new NyanProgressPlugin(), // 进度条
    new webpack.DefinePlugin({
      'process.env': { // 这是给 React / Redux 打包用的
        NODE_ENV: JSON.stringify('production'),
      },
      // ================================
      // 配置开发全局常量
      // ================================
      __DEV__: env === 'development',
      __PROD__: env === 'production',
      __COMPONENT_DEVTOOLS__: false, // 是否使用组件形式的 Redux DevTools
      __WHY_DID_YOU_UPDATE__: false, // 是否检测不必要的组件重渲染
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: module => module.context && module.context.indexOf('node_modules') !== -1,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: postcssConfig.plugins,
        eslint: {
          configFile: path.join(process.cwd(), '.eslintrc'),
        },
      },
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(process.cwd(), 'src', 'index.html'),
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
    }),
    new webpack.ContextReplacementPlugin(/\.\/locale$/, 'empty-module', false, /js$/),
  ],
};
