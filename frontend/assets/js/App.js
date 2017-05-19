import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';

require('jquery'); // eslint-disable-line no-unresolved

((function App(window, $) {
  /**
   * Vendor libraries.
   *
   * This also ensures that these libraries are bundled specifically
   * into this main App.js file instead of being included multiple
   * times into the children chunks.
   */
  // const debounce = require('throttle-debounce/debounce');
  // const throttle = require('throttle-debounce/throttle');

  /**
   * Lift default modules.
   */
  // require('./base/ajaxForms')(); // Needed for Ajax
  // require('./base/alerts')();
  require('./base/csrf')(); // Needed for Ajax
  // require('./base/prettyImageUpload')();
  // require('./base/progressiveImages')();


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
        require('./base/hello')();

        // loads the Icon plugin
        UIkit.use(Icons);

        // components can be called from the imported UIkit reference
        // UIkit.notification('Test for UiKit');

        $(window).trigger('el.init');
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
     *     <div class=".l-body" data-model="home" data-action="init">
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
