/**
 * Image optimisation.
 *
 * Automatic optimisation of *template* images (not user-uploaded media).
 * SVGs processed by this task are not added to the template includes or
 * icon sprite.
 *
 * Order-of-operations:
 *     1. Check if image differs from file in build dir
 *     2. Optimise image based on file type
 *     3. Write image to build dir
 *     4. Stream new image to BrowserSync
 *
 * @see config.js for imagemin options.
 */
/* eslint-disable import/no-extraneous-dependencies */

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

const bs = require('browser-sync').get('main');
const path = require('path');

const config = require('../config');


gulp.task('images', () =>
  gulp.src(path.join(config.source.images, '**', '*.{gif,jpg,jpeg,png,svg}'))
    .pipe($.changed(config.build.images))
    .pipe($.imagemin(config.options.imagemin))
    .pipe(gulp.dest(config.build.images))
    .pipe(bs.stream()));
