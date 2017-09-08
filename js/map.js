'use strict';

(function () {
  var closeClickHandler = function (event) {
    event.preventDefault();
    window.card.closeDialog();
  };

  var closeKeydownHandler = function (event) {
    window.util.isEnterEvent(event, window.card.closeDialog);
  };

  var escKeydownHandler = function (event) {
    window.util.isEscEvent(event, window.card.closeDialog);
  };

  document.addEventListener('keydown', escKeydownHandler);

  window.card.dialogCloseElement.addEventListener('click', closeClickHandler);
  window.card.dialogCloseElement.addEventListener('keydown', closeKeydownHandler);
})();
