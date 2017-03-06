/**
 * Initialise BrowserSync and watch files for changes.
 */
/* eslint-disable import/no-extraneous-dependencies */

const gulp = require('gulp');

const bs = require('browser-sync').create('main');
const path = require('path');

const config = require('../config');


gulp.task('watch', [
  'css',
  'icons',
  'images',
  'pug',
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
  gulp.watch(path.join(config.source.icons, '**', '*.svg'), ['icons']);
  gulp.watch(path.join(config.source.images, '**', '*.{gif,jpg,jpeg,png,svg}'), ['images']);
  gulp.watch(path.join(config.source.js, '**', '*.js'), ['webpack']);
});
