'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;
  var lastTimeout;

  window.startDebounce = function (action) {
    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }

    lastTimeout = setTimeout(action, DEBOUNCE_INTERVAL);
  };
})();
