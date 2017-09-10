'use strict';

(function () {
  var utilModule = window.util;

  window.showCard = {
    mouseClickEvent: function (element, showCard) {
      element.addEventListener('click', function () {
        showCard();
      });
    },
    enterKeydownEvent: function (element, showCard) {
      element.addEventListener('keydown', function () {
        utilModule.isEnterEvent(event, showCard);
      });
    }
  };
})();
