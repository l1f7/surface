/**
 * This is the file where we configure all the top-level
 * tasks that our build processes use.
 */

const gulp = require('gulp');
const sequence = require('gulp-sequence');
const notifier = require('node-notifier');
const gutil = require('gulp-util');
const argv = require('yargs').argv;

// We get an error by running "gulp" alone without
// a default task assigned, so we're just covering
// our bases here
gulp.task('default', (cb) => {
  if (argv.lint) {              // gulp --lint
    sequence('lint', cb);
  } else if (argv.proto) {      // gulp --proto
    sequence('prototype', cb);
  } else if (argv.dev) {        // gulp --dev
    sequence('development', cb);
  } else if (argv.prod) {       // gulp --prod
    sequence('production', cb);
    notifier.notify({
      title: 'Gulp Error',
      subtitle: 'Running Production tasks',
      message: 'Are you sure you want to be running production tasks manually?',
    });
  } else {
    notifier.notify({
      title: 'Gulp Error',
      subtitle: 'You must provide a flag to Gulp',
      message: '`gulp --proto`, `gulp --dev`, `gulp --prod`, or `gulp --lint`',
    });
    gutil.log(gutil.colors.bgRed.bold.white('========================================'));
    gutil.log(gutil.colors.bgRed.bold.white('ERROR: You must provide a flag to Gulp'));
    gutil.log(gutil.colors.bgRed.bold.white('========================================'));
    gutil.log(gutil.colors.bold.green('gulp --proto'), gutil.colors.white('for prototyping'));
    gutil.log(gutil.colors.bold.green('gulp --dev'), gutil.colors.white('for application/website work'));
    gutil.log(gutil.colors.bold.green('gulp --prod'), gutil.colors.white('for building production assets'));
    gutil.log(gutil.colors.bold.green('gulp --lint'), gutil.colors.white('for linting Sass and Javascript files'));
    gutil.log('---');
    cb();
  }
});

// Use these tasks to set our NODE_ENV manually
gulp.task('set-dev-node-env', () => (process.env.NODE_ENV = 'development'));
gulp.task('set-prod-node-env', () => (process.env.NODE_ENV = 'production'));

// Prototype is when we're working through initial
// templates, aesthetics, and design decisions
gulp.task('prototype', ['set-dev-node-env'], (cb) => {
  sequence(['images', 'svgs'], 'pug', 'cssmin', 'webpack', ['watch', 'browserSync'], cb);
});

// Development is when we're working on the actual
// Django website/application
gulp.task('development', ['set-dev-node-env'], (cb) => {
  // gulp-sequence allows us to run tasks in a specific
  // order (normally Gulp uses "streams" which means tasks
  // run independent of each other, which is good but not
  // always what we want, ie. you want JS to be linted
  // before you webpack/uglify it)
  sequence(['images', 'svgs'], 'cssmin', 'webpack', ['watch', 'browserSync'], cb);
});

// Production is when we're building assets for
// the actual server
gulp.task('production', ['set-prod-node-env'], (cb) => {
  sequence(['images', 'svgs'], 'cssmin', 'webpack', cb);
});

// Lint all Sass and Javascript files
gulp.task('lint', (cb) => {
  sequence('sasslint', 'eslint', () => {
    cb();
    process.exit();
  });
});
