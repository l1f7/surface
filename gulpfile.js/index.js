/**
 * Gulp task bootstrap.
 *
 * Define default tasks & import sub-tasks. See the individual tasks for
 * more details/docs.
 */
/* eslint-disable import/no-extraneous-dependencies */

const gulp = require('gulp');

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
