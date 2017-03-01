var gulp    = require('gulp')
,   config  = require('../config/index.js')
,   images  = require('../config/images')
,   svgs    = require('../config/svgs')
,   sass    = require('../config/sass')
,   pug     = require('../config/pug')
,   argv    = require('yargs').argv
,   webpack = require('../config/webpack.base')(process.env.NODE_ENV)
,   watch   = require('gulp-watch');

//gulp.task('watch', ['browserSync'], function() {
gulp.task('watch', function() {

  watch(images.src,        function() { gulp.start('images'); });
  watch(svgs.svg.src,      function() { gulp.start('svgs'); });
  watch(config.sourceDirectory + 'js/**',       function() { gulp.start('eslint', 'webpack'); });

  // We set 'sass' as a dependency of 'cssmin', so
  // we actually call cssmin when sass changes. This
  // means SASS runs, and then our CSSMIN task.
  watch(sass.src,          function() { gulp.start('cssmin'); });

  if (argv.proto) {
    global.pugFirstCompile = true
    watch(pug.src,        function() { gulp.start('pug'); });
  }
});
