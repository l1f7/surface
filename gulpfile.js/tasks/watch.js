/**
 * Initialise BrowserSync and watch files for changes.
 */
/* eslint-disable import/no-extraneous-dependencies */

const config = require('../config');
const gulp = require('gulp');
const path = require('path');

const bs = require('browser-sync').create('main');


gulp.task('watch', [
  'css',
  'webpack',
], () => {
  const justReload = [
    path.join(config.views, '**', '*.html'),
  ];

  bs.init(config.options.browsersync);

  if (config.proto) {
    gulp.watch(path.join(config.source.pug, '**', '*.pug'), ['pug']);
  }

  gulp.watch(justReload, bs.reload);
  gulp.watch(path.join(config.source.sass, '**', '*.scss'), ['css']);
  gulp.watch(path.join(config.source.js, '**', '*.js'), ['webpack']);
});
