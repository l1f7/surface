/**
 * PRETTY IMAGES
 * The default Django image upload field is pretty terrible
 * looking, so I built our custom version that uses the
 * HTML5 FileReader API to auto-generate thumbnails for
 * users before uploading.
 */
const $images = $('.js-image');
const regex = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.gif|.png|.bmp)$/;

function prettyImageUpload() {
  // Loop through all the image upload fields on the page
  // and then hookup the changing elements within them
  $images.each(function imageUpload() {
    const $field = $(this);
    const $name = $field.find('.js-image-name');
    const $file = $field.find('.js-file :file');
    const $thumb = $field.find('.js-image-thumb');

    $file.on('change', () => {
      const file = $file[0].files[0];
      const label = file.name.toLowerCase();
      let reader;

      // If the browser supports the HTML5 File Api, show
      // them a proper thumbnail image
      if (window.FileReader) {
        reader = new FileReader();

        // Make sure they uploaded an image file
        if (regex.test(label.toLowerCase())) {
          $thumb.html('');
          $name.removeClass('has-error')
            .addClass('has-value')
            .find('span')
              .text(label);

          // Then load the file and generate a thumbnail
          // through the client-side FileReader api
          reader.onload = function fileLoaded(e) {
            const img = $('<img />');
            img.attr('style', 'width:150px;');
            img.attr('src', e.target.result);
            $thumb.html(img);
            $name.parent().addClass('has-image');
          };
          reader.readAsDataURL(file);
        } else {
          // Show error
          $thumb.html('');
          $name.removeClass('has-value')
            .addClass('has-error')
            .find('span')
              .text('Please upload a valid image file');
        }
      } else {
        // This is a pre-HTML5 browser, so just set the label
        $name.removeClass('has-error')
          .addClass('has-value')
          .find('span')
            .text(label);
      }
    });
  });
}

module.exports = prettyImageUpload;
