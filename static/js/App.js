require('jquery'); // eslint-disable-line no-unresolved

((function App(window, $) {
  // Vendor/Bower Libraries
  // This also ensures that these libraries are bundled specifically
  // into this main App.js file instead of being included multiple
  // times into the children chunks
  // require('PubSub/src/pubsub');

  //
  // Foundation Core & Utilities
  //
  // require('what-input/what-input.js');
  // require('foundation-sites/js/foundation.core.js');
  // require('foundation-sites/js/foundation.util.mediaQuery.js');
  // require('foundation-sites/js/foundation.util.timerAndImageLoader.js');
  // require('foundation-sites/js/foundation.util.triggers.js');
  // require('foundation-sites/js/foundation.util.motion.js');
  // require('foundation-sites/js/foundation.util.box.js');
  // require('foundation-sites/js/foundation.util.keyboard.js');
  // require('foundation-sites/js/foundation.util.nest.js');
  // require('foundation-sites/js/foundation.util.touch.js');

  //
  // Foundation Modules
  //
  // require('foundation-sites/js/foundation.abide.js');
  // require('foundation-sites/js/foundation.reveal.js');
  // require('foundation-sites/js/foundation.accordion.js');
  // require('foundation-sites/js/foundation.accordionMenu.js');
  // require('foundation-sites/js/foundation.drilldown.js');
  // require('foundation-sites/js/foundation.dropdown.js');
  // require('foundation-sites/js/foundation.dropdownMenu.js');
  // require('foundation-sites/js/foundation.equalizer.js');
  // require('foundation-sites/js/foundation.interchange.js');
  // require('foundation-sites/js/foundation.magellan.js');
  // require('foundation-sites/js/foundation.offcanvas.js');
  // require('foundation-sites/js/foundation.orbit.js');
  // require('foundation-sites/js/foundation.responsiveMenu.js');
  // require('foundation-sites/js/foundation.responsiveToggle.js');
  // require('foundation-sites/js/foundation.slider.js');
  // require('foundation-sites/js/foundation.sticky.js');
  // require('foundation-sites/js/foundation.tabs.js');
  // require('foundation-sites/js/foundation.toggler.js');
  // require('foundation-sites/js/foundation.tooltip.js');

  //
  // LIFT Base Modules
  //
  // require('./base/csrf')(); // Needed for Ajax
  // require('./base/forms')(); // Needed for Ajax
  // require('./base/alerts')();
  // require('./base/jquery.throttle-debounce')();
  // require('./base/prettyImageUpload')();
  // require('./base/progressiveImages')();


  const LIFT = {
    // common gets called for every single page/view which means
    // global elements should be contained in here
    // ie. global navigation
    common: {
      init() {
        /*eslint-disable */
        console.log('%cMADE BY LIFT | liftinteractive.com',
          `background: white; color: #333; border: 1px solid #333;
           line-height: 30px; padding: 5px 10px;`);
        /*eslint-enable */

        $(window).trigger('el.init');
        // $(document).foundation();
      },
    },
  };


  const UTIL = {
    exec(model, action) {
      const modelAction = (action === undefined) ? 'init' : action;

      if (model !== '' && LIFT[model] && typeof LIFT[model][modelAction] === 'function') {
        LIFT[model][modelAction]();
      }
    },

    init() {
      // the following looks for an element with a class "body"
      // and then pulls the value of it's data-model and data-action
      // attributes (if they exist, which they should):
      // ie.: <div class="mainblock" data-model="myModel">
      const $sitewrap = $('.l-body');
      const model = $sitewrap.data('model');
      const action = $sitewrap.data('action');

      UTIL.exec('common');      // calls LIFT.common.init()
      UTIL.exec(model);         // calls LIFT.model.init()

      if (action !== undefined) {
        UTIL.exec(model, action); // calls LIFT.model.action()
      }
    },
  };

  // DOM ready, let's DO DIS!
  $(document).ready(UTIL.init);
})(window, jQuery));
