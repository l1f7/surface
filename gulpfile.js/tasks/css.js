/**
 * Sass & CSS processing.
 *
 * Order-of-operations:
 *     1. Process Sass code into CSS
 *     2. Generate sourcemaps (in prod only)
 *     3. Prefix & optimize CSS
 *     4. Minify final CSS
 *     5. Write CSS stats log
 *     6. Update build dir
 *     7. Stream new CSS to BrowserSync
 */
/* eslint-disable import/no-extraneous-dependencies */

const config = require('../config');
const gulp = require('gulp');
const path = require('path');

const $ = require('gulp-load-plugins')();
const autoprefixer = require('autoprefixer');
const bs = require('browser-sync').get('main');


gulp.task('css', () =>
  gulp
    .src(path.join(config.source.sass, '**', '*.scss'), { base: config.source.sass })
    .pipe(config.prod ? $.util.noop() : $.sourcemaps.init())
      .pipe($.sass(config.options.sass))
      .on('error', function handleError(err) {
        $.util.log(err.message);
        bs.notify(err.message, 10000);
        this.emit('end');
      })
      .pipe($.postcss([
        autoprefixer(config.options.autoprefixer),
      ]))
    .pipe(config.prod ? $.util.noop() : $.sourcemaps.write())
    .pipe($.size()) // @TODO: Is this needed?
    .pipe(gulp.dest(config.build.css))
    .pipe(bs.stream()),
);
