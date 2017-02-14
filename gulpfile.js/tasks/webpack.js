/**
 * Webpack
 * ----------------------------------------------------
 * Webpack splits our javascript into modules that makes
 * it a lot easier to maintain large javascript projects.
 */
const gulp = require('gulp');
const logger = require('../lib/compileLogger');
const webpack = require('webpack');

function buildConfig(env) {
  return require('../config/webpack.' + env + '.js')({ env: env })
}

gulp.task('webpack', ['eslint'], function (callback) {
  webpack(buildConfig(process.env.NODE_ENV), function(err, stats) {
    logger(err, stats)
    callback()
  })
});
