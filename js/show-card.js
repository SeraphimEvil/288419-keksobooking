'use strict';

(function () {
  var utilModule = window.util;

  window.showCard = {
    mouseEventHandler: function (element, showCard) {
      element.addEventListener('click', function () {
        showCard();
      });
    },
    keydownEventHandler: function (element, showCard) {
      element.addEventListener('keydown', function () {
        utilModule.isEnterEvent(event, showCard);
      });
    }
  };
})();
