'use strict';

(function () {
  var utilModule = window.util;

  window.showCard = {
    isMouseClick: function (element, showCard) {
      element.addEventListener('click', function () {
        showCard();
      });
    },
    isEnterKeydown: function (element, showCard) {
      element.addEventListener('keydown', function () {
        utilModule.isEnterEvent(event, showCard);
      });
    }
  };
})();
