import jQuery from 'jquery';

import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';

import ScrollMagic from 'scrollmagic';
import slick from 'slick-carousel'
import flowplayer from "flowplayer";

import initGreeting from './base/hello';
import initCSRFToken from './base/csrf';
import initAjaxForms from './base/ajaxForms';

import initVideo from './modules/video';

((function App(window, $) {
  const LIFT = {
    /**
     * Base view.
     *
     * Called on every page/view. Add global components here (eg: navigation
     * modules, etc.).
     */
    common: {

      /**
       * `init` is the action each view executes by default.
       */
      init() {
        /**
         * Lift default modules.
         */
        initGreeting();
        initCSRFToken(); // Needed for Ajax
        initAjaxForms(); // Needed for Ajax'd Snippetforms
        
        initBanner();
        initVideo();

        /**
         * UIkit
         */
        // loads the Icon plugin
        UIkit.use(Icons);

        // components can be called from the imported UIkit reference
        // UIkit.notification('Test for UiKit');

        /**
         * Scroll List
         */
        var controller = null;

        function initializeSlick(){
          $('.lf-scrolllist-slick').slick({
            dots: true,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            adaptiveHeight: true
          });
        }

        function initializeScrollMagic() {
          $('body').scrollTop(0);

          controller = new ScrollMagic.Controller();

          $('.lf-scrolllist').each(function(){
            var imageScene = new ScrollMagic.Scene({
                triggerElement: this, duration: $(this).height() - $(this).find('.lf-scrolllist-image').outerHeight()
              })
              .triggerHook(0)
              .setPin($(this).find('.lf-scrolllist-imageContainer')[0])
              .addTo(controller);
          });

          // create scene for every slide
          $('.lf-scrolllist-slide').each(function(){
            var image = $(this).data('imagecontainer');
            var slideScene = new ScrollMagic.Scene({
                triggerElement: this, duration: $(this).outerHeight()
              })
              .triggerHook(0.5)
              .on('enter leave', function (e) {
                var photoIndex = $(e.target.triggerElement()).index();
                var scrollList = $(e.target.triggerElement()).parents('.lf-scrolllist');
                $(scrollList).find('.lf-scrolllist-img').eq(photoIndex).removeClass('is-inside is-outside')
                $(scrollList).find('.lf-scrolllist-img').eq(photoIndex).addClass('is-' + (e.type == 'enter' ? 'inside' : 'outside'))
              })
              .on('start end', function (e) {
                var photoIndex = $(e.target.triggerElement()).index();
                var scrollList = $(e.target.triggerElement()).parents('.lf-scrolllist');
                $(scrollList).find('.lf-scrolllist-img').eq(photoIndex).removeClass('is-top is-bottom')
                $(scrollList).find('.lf-scrolllist-img').eq(photoIndex).addClass('is-' + (e.type == 'start' ? 'top' : 'bottom'))
              })
              .addTo(controller);
          });
        }

        function destroySlick(){
          $('.lf-scrolllist-slick').slick('unslick');
        }

        function destroyScrollMagic(){
          if (controller) {
            console.log('controller', controller);
            controller = controller.destroy(true);

            $('.scrollmagic-pin-spacer').contents().unwrap();
            $('.lf-scrolllist-imageContainer').attr('style', '');
          }
        }

        function mediaSize() {          
          if( window.matchMedia('(min-width: 640px)').matches ) {
            if ( !controller ) {
              initializeScrollMagic()
            }
          } else {
            destroyScrollMagic();
            initializeSlick();
          }
        }

        mediaSize();

        window.addEventListener('resize', mediaSize, false);
      },
    },
  };


  const UTIL = {
    /**
     * Executes the defined view function.
     *
     * @param {Object}   model         - The current view.
     * @param {Function} [action=init] - The function to execute.
     */
    exec(model, action) {
      const modelAction = (action === undefined) ? 'init' : action;

      if (model !== '' && LIFT[model] && typeof LIFT[model][modelAction] === 'function') {
        LIFT[model][modelAction]();
      }
    },

    /**
     * Gets the view and action (if defined) from the main DOM container.
     *
     * @example
     *     <div class='.l-body' data-model='home' data-action='init'>
     */
    init() {
      const $sitewrap = $('.l-body');
      const model = $sitewrap.data('model');
      const action = $sitewrap.data('action');

      // Calls LIFT.common.init()
      UTIL.exec('common');
      // Calls LIFT.model.init()
      UTIL.exec(model);

      if (action !== undefined) {
        // Calls LIFT.model.action()
        UTIL.exec(model, action);
      }
    },
  };

  /** Lift-off in T-minus DOMReady. */
  $(document).ready(UTIL.init);
})(window, jQuery));
