function preventDoubleSubmit() {
  const $dbls = $('.js-prevent-dblclick');
  $dbls.each((index, el) => {
    const $dbl = $(el);
    $dbl.on('click', () => {
      $dbl.prop('disabled', true);
    });
  });
}

export default function initAjaxForms() {
  console.log('formajax.js init'); // eslint-disable-line

  preventDoubleSubmit();

  $('.js-form-field').on({
    focus: (event) => {
      $(event.target).parent('.field').addClass('field--focus');
    },
    blur: (event) => {
      $(event.target).parent('.field').removeClass('field--focus');
    },
  });

  $.ajaxSetup({
    beforeSend: function beforeSend(xhr, settings) {
      function getCookie(name) {
        let cookieValue = null;

        if (document.cookie && document.cookie !== '') {
          const cookies = document.cookie.split(';');

          for (let i = 0; i < cookies.length; i += 1) {
            const cookie = jQuery.trim(cookies[i]);

            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (`${name}=`)) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
            }
          }
        }

        return cookieValue;
      }

      if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
        // Only send the token to relative URLs i.e. locally.
        xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken'));
      }
    },
  });

  $('.js-formajax').on('submit', function submitForm(e) {
    const $form = $(this);
    const $data = $(this).serialize();
    let $successMsg;
    let message;

    e.preventDefault();
    // console.log('Form Submit');

    $.ajax({
      type: 'POST',
      url: $(this).attr('action'),
      data: $data,
      success: function onAjaxSuccess() {
        // console.log('Success', data);

        $successMsg = $form.data('form-success-msg');
        $successMsg = decodeURI($successMsg);
        $('.form-message').html($successMsg);
        $('.form-message').addClass('is-active');
        $form.find('.field').removeClass('field--error');
        $form.find('.error').html('');
        $form[0].reset();
      },
      error: function onAjaxError(data) {
        // console.log('Error', data);

        message = JSON.parse(data.responseText);
        $('.form-message').removeClass('is-active');
        $form.find('.field').removeClass('field--error');
        $form.find('.error').html('');

        Object.keys(message).forEach((key) => {
          if (Object.prototype.hasOwnProperty.call(message, key)) {
            $(`#id_${key}`).next('.error').html(message[key]);
            $(`#id_${key}`).parents('.field').addClass('field--error');
          }
        });
      },
    });
  });
}
