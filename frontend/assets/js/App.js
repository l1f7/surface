import jQuery from 'jquery';

import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';

import initGreeting from './base/hello';
import initCSRFToken from './base/csrf';
import initAjaxForms from './base/ajaxForms';
// import initProgressiveImages from './base/progressiveImages';

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
        // initProgressiveImages();

        /**
         * UIkit
         */
        // loads the Icon plugin
        UIkit.use(Icons);

        // components can be called from the imported UIkit reference
        // UIkit.notification('Test for UiKit');


        // This is used to trigger the first render of our progressive image setup
        // and should remain last inside this block. see: ./base/progressiveImages.js
        // $(window).trigger('el.init');
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
  ┊ ┊ const sitewrap = document.querySelector('.l-body');
  ┊ ┊ const model = sitewrap.getAttribute('data-model');
  ┊ ┊ const action = sitewrap.getAttribute('data-action');

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
  // in case the document is already rendered
  if (document.readyState!='loading') UTIL.init;
  // modern browsers
  else if (document.addEventListener) document.addEventListener('DOMContentLoaded', UTIL.init);
  // IE <= 8
  else document.attachEvent('onreadystatechange', function(){
    if (document.readyState=='complete') UTIL.init;
  });
})(window, jQuery));
