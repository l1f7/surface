/**
 * Error notification.
 *
 * Display a popup notification when a Gulp task returns an error. Also
 * prevents running tasks from stopping (just won't output anything).
 *
 * @module surface/handleErrors
 * @param  {Object} errorObject
 * @since  1.0.0
 */
/* eslint-disable import/no-extraneous-dependencies */

const notify = require('gulp-notify');


module.exports = (errorObject, callback) => {
  notify.onError(errorObject.toString().split(': ').join(':\n')).apply(this, arguments);

  // Keep gulp from hanging on this task
  if (typeof this.emit === 'function') this.emit('end');
};
