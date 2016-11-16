/**
 * CSRF
 * This just makes sure we always have the CSRF Ajax token functionality
 * configured for any Ajax we do through jQuery.
 */
function _getCSRF(name) {
  let cookieValue = null;
  let cookies;
  let i;
  let cookie;

  if (document.cookie && document.cookie !== '') {
    cookies = document.cookie.split(';');
    for (i = 0; i < cookies.length; i++) {
      cookie = jQuery.trim(cookies[i]);
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === (`${name}=`)) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

function csrfSafeMethod(method) {
  // these HTTP methods do not require CSRF protection
  return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

function preventDoubleSubmit() {
  const $dbls = $('.js-prevent-dblclick');
  $dbls.each((index, el) => {
    const $dbl = $(el);
    $dbl.on('click', () => {
      $dbl.prop('disabled', true);
    });
  });
}

function setupCSRF() {
  // Ensure jQuery's AJAX is setup properly, no matter
  // where it might get called from
  $.ajaxSetup({
    beforeSend: function beforeSendCB(xhr, settings) {
      if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
        xhr.setRequestHeader('X-CSRFToken', _getCSRF('csrftoken'));
      }
    },
  });
  preventDoubleSubmit();
}

module.exports = setupCSRF;
