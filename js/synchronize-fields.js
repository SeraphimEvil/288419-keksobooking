'use strict';

(function () {
  window.synchronizeFields = function (element, target, action) {
    element.addEventListener('change', function () {
      action(target, element.value);
    });
  };
})();
