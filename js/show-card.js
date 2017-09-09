'use strict';

(function () {
  window.showCard = function (element, showCard) {
    element.addEventListener('click', function () {
      if (typeof showCard === 'function') {
        showCard();
      }
    });
  };
})();
