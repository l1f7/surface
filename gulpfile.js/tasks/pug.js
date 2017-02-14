/**
 * Pug
 * ----------------------------------------------------
 * Super terse html preprocessor awesomeness
 */

var bs              = require('browser-sync')
,   config          = require('../config/pug')
,   gulp            = require('gulp')
,   pug             = require('gulp-pug')
,   print           = require('gulp-print')
,   pugInheritance  = require('gulp-pug-inheritance')
,   changed         = require('gulp-changed')
,   cached          = require('gulp-cached')
,   gulpif          = require('gulp-if')
,   filter          = require('gulp-filter')
,   handleErrors    = require('../lib/handleErrors');

function checkForPartials(file) {
  var pathChunks = file.relative.split('/');
  for (var i = pathChunks.length - 1; i >= 0; i--) {
    if (pathChunks[i].charAt(0) === '_'){
      return
    }
  };
  return file
}

gulp.task('pug', function() {
  if (global.pugFirstCompile === undefined){
    return gulp.src(config.src)
      //filter out partials (folders and files starting with "_" )
      .pipe(filter(checkForPartials))
      .pipe(pug({ pretty: true }))
      .on('error', handleErrors)
      .pipe(gulp.dest(config.dest))
      .pipe(bs.reload({stream:true}));

  } else {
    return gulp.src(config.src)

      //only pass unchanged *main* files and *all* the partials
      .pipe(changed(config.dest, {extension: '.html'}))

      //filter out unchanged partials, but it only works when watching
      .pipe(cached('pug'))

      //find files that depend on the files that have changed
      .pipe(pugInheritance({basedir: config.srcDir}))

      //filter out partials (folders and files starting with "_" )
      .pipe(filter(checkForPartials))

      //process pug templates
      .pipe(pug({ pretty: true }))

      .on('error', handleErrors)
      .pipe(gulp.dest(config.dest))
      .pipe(bs.reload({stream:true}));
  }
});
