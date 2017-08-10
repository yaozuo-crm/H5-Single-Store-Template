const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const config = require('./webpack.base.config');

config.plugins = (config.plugins || []).concat([
  new CleanWebpackPlugin(['dist'], {
    root: path.resolve(__dirname, '..'),
    verbose: true,
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      drop_console: true,
    },
  }),
  new CopyWebpackPlugin([
    {
      from: './',
    },
  ], {
    ignore: [
      '**/*',
      '.DS_Store',
    ],
  }),
]);

module.exports = config;
