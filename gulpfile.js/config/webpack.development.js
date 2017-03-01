const config = require('./');
const webpack = require('webpack');
const argv = require('yargs').argv;
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.base.js');

module.exports = function (env) {
  return webpackMerge(commonConfig(), {
    // cheap-module-eval-source-map is faster for development
    // while providing full line by line source mapping
    devtool: 'cheap-module-eval-source-map',
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
