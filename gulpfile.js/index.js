/**
 * Gulp task bootstrap.
 *
 * Define default tasks & import sub-tasks. See the individual tasks for
 * more details/docs.
 */
/* eslint-disable import/no-extraneous-dependencies */

const gulp = require('gulp');

/**
 * Polyfill promises.
 *
 * Make sure we have access to the ES2015 Promise format which some Node
 * packages have started using but which not all versions of Node support yet.
 */
require('es6-promise').polyfill();

/**
 * Load task modules.
 */
require('./tasks/watch');
require('./tasks/css');
require('./tasks/icons');
require('./tasks/images');
require('./tasks/pug');
require('./tasks/webpack');


gulp.task('build', [
  'css',
  'icons',
  'images',
  'webpack',
]);

gulp.task('default', ['build']);
