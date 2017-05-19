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

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

const autoprefixer = require('autoprefixer');
const bs = require('browser-sync').get('main');
const csswring = require('csswring');
const path = require('path');

const config = require('../config');


const pcssTasks = [
  autoprefixer(config.options.autoprefixer),
];

if (config.prod) {
  pcssTasks.push(csswring(config.options.csswring));
}

gulp.task('css', () =>
  gulp
    .src(path.join(config.source.sass, '**', 'main.scss'), { base: config.source.sass })
    .pipe(config.prod ? $.util.noop() : $.sourcemaps.init())
      .pipe($.sass(config.options.sass))
      .on('error', function handleError(err) {
        $.util.log(err.message);
        bs.notify(`<pre style="text-align:left">${err.message}</pre>`, 10000);
        this.emit('end');
      })
      .pipe($.postcss(pcssTasks))
    .pipe(config.prod ? $.util.noop() : $.sourcemaps.write())
    .pipe($.size()) // @TODO: Is this needed?
    .pipe(gulp.dest(config.build.css))
    .pipe(bs.stream()));
