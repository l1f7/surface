/**
 * Generate SVG icons.
 *
 * The `images` task will process SVG images as well; these are specifically
 * for SVGs as part of an icon set.
 */
/* eslint-disable import/no-extraneous-dependencies */

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

const bs = require('browser-sync').get('main');
const path = require('path');

const config = require('../config');


gulp.task('icons', ['icons:includes', 'icons:sprite']);

/**
 * Optimise SVGs for template inclusion.
 *
 * Order-of-operations:
 *     1. Check if image differs from file in build dir
 *     2. Optimise image (uses SVGO)
 *     3. Write image to template `_includes` dir
 */
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

/**
 * Collect icons into a single sprite file.
 *
 * Order-of-operations:
 *     1. Check if image differs from file in build dir
 *     2. Optimise SVG and build spritesheet
 *     3. Write image to images dir
 *     4. Stream updated sprite to BrowserSync
 *
 * @see config.js for svgsprite options.
 */
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
