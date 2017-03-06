/**
 * Pug template compilation.
 *
 * Currently re-renders the entire template folder.
 */
/* eslint-disable import/no-extraneous-dependencies */

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

const bs = require('browser-sync').get('main');
const path = require('path');

const config = require('../config');


gulp.task('pug', () =>
  gulp
    .src(path.join(config.source.pug, '**', '*.pug'))
    .pipe($.pug({ pretty: true }))
    .on('error', function handleError(err) {
      $.util.log(err.message);
      bs.notify(`<pre style="text-align:left">${err.message}</pre>`, 10000);
      this.emit('end');
    })
    .pipe(gulp.dest(config.build.pug))
    .pipe(config.proto ? bs.reload() : $.util.noop()));
