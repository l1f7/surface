/**
 * SVG Tasks
 * ----------------------------------------------------
 * Three things are happening in here:
 *    1. Minifying/cleanup of SVG images
 *    2. #1 + conversion to pug templates for svg files
 *       that are to be inlined in the HTML
 */
/* eslint-disable import/no-extraneous-dependencies */

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

const bs = require('browser-sync').get('main');
const path = require('path');

const config = require('../config');


gulp.task('icons', ['icons:includes', 'icons:sprite']);

gulp.task('icons:includes', () =>
  gulp
    .src(path.join(config.source.icons, '**', '*.svg'))
    .pipe($.changed(config.build.includes))
    .pipe($.imagemin(config.options.imagemin))
    .on('error', function handleError(err) {
      $.util.log(err.message);
      bs.notify(`<pre style="text-align:left">${err.message}</pre>`, 10000);
      this.emit('end');
    })
    .pipe(gulp.dest(config.build.includes)));

gulp.task('icons:sprite', () =>
  gulp
    .src(path.join(config.source.icons, '**', '*.svg'))
    .pipe($.changed(config.build.images))
    .pipe($.svgSprite(config.options.svgsprite))
    .on('error', function handleError(err) {
      $.util.log(err.message);
      bs.notify(`<pre style="text-align:left">${err.message}</pre>`, 10000);
      this.emit('end');
    })
    .pipe(gulp.dest(config.build.images))
    .pipe(bs.stream()));
