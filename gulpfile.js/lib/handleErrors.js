/**
 * Error notification.
 *
 * Display a popup notification when a Gulp task returns an error. Also
 * prevents running tasks from stopping (just won't output anything).
 *
 * @module surface/handleErrors
 * @param  {Object} err
 * @since  1.0.0
 */
/* eslint-disable import/no-extraneous-dependencies */

const $ = require('gulp-load-plugins')();


module.exports = (err, callback) => {
  // const cleanError = err.message.split(': ').join(':\n');

  $.util.log(err.message);
  // Keep gulp from hanging on this task.
  if (typeof this.emit === 'function') this.emit('end');
};
