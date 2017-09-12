'use strict';

(function () {
  var utilModule = window.util;

  window.showCard = {
    addClickListener: function (element, showCard) {
      element.addEventListener('click', function () {
        showCard();
      });
    },
    addKeydownListener: function (element, showCard) {
      element.addEventListener('keydown', function () {
        utilModule.isEnterEvent(event, showCard);
      });
    }
  };
})();
