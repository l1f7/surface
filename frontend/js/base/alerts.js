/**
 * CUSTOM ALERTS
 * Django has it's own messages system, which you can find now
 * in /includes/messagebar.html. However, it was a pain dealing
 * with messages for Ajax-based functionality, so this allows us
 * to use custom jQuery events to generate system messages
 * anytime we want.
 *
 * 1. The message you want to push to the user
 * 2. The "type" of message, can be: error, warning, success, info
 *
 * Usage:
 *
 * $(window).trigger('el.alert', {
 *   msg: 'Message', // 1
 *   type: 'warning', // 2
 * });
 */
function alerts() {
  let $newAlert = null;
  const $alert = $('.js-alerts');
  const alertTimer = new Foundation.Timer($alert, {
    duration: 2500,
    infinte: false,
  }, () => {
    $newAlert.removeClass('alert--flash--enter').addClass('alert--flash--exit');
  });

  $('.js-alert-trigger').on('click', () => {
    $(window).trigger('el.alert', {
      type: 'success',
      msg: 'Just testing the alert system',
    });
  });

  $(window).on('el.alert', (event, obj) => {
    $alert.html(`
      <div class="alert alert--flash alert--${obj.type}">
        <p class="alert-text">${obj.msg}</p>
      </div>
    `);
    $newAlert = null;
    $newAlert = $alert.find('.alert');
    $newAlert.addClass('alert--flash--enter');
    alertTimer.restart();
  });
}

module.exports = alerts;
