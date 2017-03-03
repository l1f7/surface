/**
 * Message logging.
 *
 * @module surface/compileLogger
 * @since  1.0.0
 */
/* eslint-disable import/no-extraneous-dependencies */

const handleErrors = require('./handleErrors');
const gutil = require('gulp-util');


module.exports = (err, stats) => {
  if (err) throw new gutil.PluginError('webpack', err);

  let statColor = stats.compilation.warnings.length < 1 ? 'green' : 'yellow';

  function prettifyTime(milliseconds) {
    let time = '';

    if (milliseconds > 999) {
      time = `${(milliseconds / 1000).toFixed(2)}s`;
    } else {
      time = `${milliseconds}ms`;
    }

    return time;
  }

  if (stats.compilation.errors.length > 0) {
    stats.compilation.errors.forEach((error) => {
      handleErrors(error);
      statColor = 'red';
    });
  } else {
    const compileTime = prettifyTime(stats.endTime - stats.startTime);

    gutil.log(gutil.colors[statColor](stats));
    gutil.log(
      'Compiled with',
      gutil.colors.cyan(`webpack:${process.env.NODE_ENV}`),
      'in',
      gutil.colors.magenta(compileTime));
  }
};
