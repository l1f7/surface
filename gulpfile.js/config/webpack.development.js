const config = require('./');
const webpack = require('webpack');
const argv = require('yargs').argv;
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.base.js');

module.exports = function (env) {
  return webpackMerge(commonConfig(), {
    // eval-source-map is faster for development
    devtool: 'eval-source-map',
    plugins: [
      new webpack.DefinePlugin({
        DEBUG: (argv.dev || argv.proto) ? true : false,
        'process.env': {
          'NODE_ENV': JSON.stringify('development')
        }
      })
    ],
  });
}
