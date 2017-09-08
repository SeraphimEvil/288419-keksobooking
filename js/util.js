'use strict';

(function () {
  var keyCode = {
    ESC: 27,
    ENTER: 13
  };

  window.util = {
    isEscEvent: function (event, action) {
      if (event.keyCode === keyCode.ESC) {
        action();
      }
    },
    isEnterEvent: function (event, action) {
      if (event.keyCode === keyCode.ENTER) {
        action();
      }
    }
  };
})();
