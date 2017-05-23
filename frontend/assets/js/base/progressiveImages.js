const throttle = require('throttle-debounce/throttle');

let $progImgs;

/**
 * SETUP IMAGES
 * For every element that has the .js-progressive wrapper class,
 * setup the width/height ratios for the image based on the
 * thumbnail's dimensions.
 */
function setupImages() {
  $progImgs = $('.js-progressive');

  $progImgs.each(function setupImage() {
    const $img = $(this);
    const width = $img.data('width');
    const height = $img.data('height');
    const ratio = `${(height / width) * 100}%`;
    const $ratioEl = $img.find('.progressive-ratio');
    if ($ratioEl.attr('style') === undefined) {
      $ratioEl.css('padding-bottom', ratio);
    }
  });
}

function loadImg(options, callback) {
  const img = new Image();
  let maxSeconds = 10;
  let seconds = 0;
  let complete = false;
  let done = false;

  if (options.maxSeconds) {
    maxSeconds = options.maxSeconds;
  }

  function tryImage() {
    if (done) {
      return;
    }

    if (seconds >= maxSeconds) {
      callback({
        err: 'timeout',
      });
      done = true;
      return;
    }

    if (complete && img.complete) {
      if (img.width && img.height) {
        callback({
          img,
        });
        done = true;
        return;
      }

      callback({
        err: '404',
      });
      done = true;
      return;
    } else if (img.complete) {
      complete = true;
    }
    seconds++;
    setTimeout(tryImage, 1000);
  }

  img.onload = tryImage();
  img.src = options.src;
  tryImage();
}

/**
 * SCROLLING
 * Checks if the top of the element is within a specified vertical
 * distance from the bottom of the window, if it is, then start the
 * loading process of the image.
 */
function scrolling() {
  const st = $(window).scrollTop();
  const wHeight = $(window).height();

  $progImgs.not('.is-loaded').each(function imgNotLoaded() {
    const $img = $(this);
    const offset = $img.offset();
    const src = $img.data('src');
    const diff = $(window).width > 600 ? 500 : 300;

    if (st + wHeight + diff > offset.top) {
      $img.addClass('is-loading');
      loadImg({ src, maxSeconds: 10 }, (status) => {
        if (!status.err) {
          $img.css('background-image', `url(${src})`)
            .find('.progressive-image').attr('src', src);
          $img.removeClass('is-loading').addClass('is-loaded');
          $img.find('.loader').remove();
        }
      });
    }
  });
}

export default function initProgressiveImages() {
  setupImages();
  $(window).scroll(throttle(250, scrolling));
  $(window).on('el.init', () => {
    scrolling();
  });
}
