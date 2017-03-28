/**
 * A simple task wrapper to run the Webpack bundler.
 *
 * @see webpack.config.js for configuration.
 */
/* eslint-disable import/no-extraneous-dependencies */

const gulp = require('gulp');

const bs = require('browser-sync').get('main');
const webpack = require('webpack');

const logger = require('../lib/compileLogger');
const webpackConfig = require('../../webpack.config');


gulp.task('webpack', () => {
  webpack(webpackConfig, (err, stats) => {
    logger(err, stats);
  });
  bs.reload();
});
