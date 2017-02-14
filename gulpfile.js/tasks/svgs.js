/**
 * SVG Tasks
 * ----------------------------------------------------
 * Three things are happening in here:
 *    1. Minifying/cleanup of SVG images
 *    2. #1 + conversion to pug templates for svg files
 *       that are to be inlined in the HTML
 */

var bs           = require('browser-sync')
,   changed      = require('gulp-changed')
,   config       = require('../config/svgs')
,   gulp         = require('gulp')
,   svgmin       = require('gulp-svgmin')
,   html2pug     = require('gulp-html2pug')
,   flatten      = require('gulp-flatten')
,   handleErrors = require('../lib/handleErrors');


// Minify our normal SVG images
gulp.task('svgs', function() {
  return gulp.src(config.svg.src)
    .pipe(changed(config.svg.dest)) // Ignore unchanged files
    .pipe(svgmin(config.svg.svgmin)) // Optimize
      .on('error', handleErrors)
    .pipe(gulp.dest(config.svg.dest))
    .pipe(bs.reload({stream:true}));
});
