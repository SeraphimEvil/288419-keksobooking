'use strict';

(function () {
  var cardModule = window.card;
  var utilModule = window.util;

  var closeClickHandler = function (event) {
    event.preventDefault();
    cardModule.closeDialog();
  };

  var closeKeydownHandler = function (event) {
    utilModule.isEnterEvent(event, cardModule.closeDialog);
  };

  var escKeydownHandler = function (event) {
    utilModule.isEscEvent(event, cardModule.closeDialog);
  };

  document.addEventListener('keydown', escKeydownHandler);

  cardModule.dialogCloseElement.addEventListener('click', closeClickHandler);
  cardModule.dialogCloseElement.addEventListener('keydown', closeKeydownHandler);
})();
