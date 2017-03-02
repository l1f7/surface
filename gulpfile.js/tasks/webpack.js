/**
 * A simple task wrapper to run the Webpack bundler.
 *
 * @see webpack.config.js for configuration.
 */
/* eslint-disable import/no-extraneous-dependencies */

const gulp = require('gulp');
const logger = require('../lib/compileLogger');

const webpack = require('webpack');
const webpackConfig = require('../../webpack.config');


gulp.task('webpack', () =>
  webpack(webpackConfig, (err, stats) => {
    logger(err, stats);
  }));

// function buildConfig(env) {
//   return require('../config/webpack.' + env + '.js')({ env: env })
// }

// gulp.task('webpack', ['eslint'], function (callback) {
//   webpack(buildConfig(process.env.NODE_ENV), function(err, stats) {
//     logger(err, stats)
//     callback()
//   })
// });
