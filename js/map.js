'use strict';

(function () {
  var cardModule = window.card;
  var utilModule = window.util;
  var pinModule = window.pin;
  var formModule = window.form;
  var dataModule = window.data;

  var pinMapClickHandler = function (event) {
    cardModule.openDialog(event);
  };

  var pinMapKeydownHandler = function (event) {
    utilModule.isEnterEvent(event, cardModule.openDialog);
  };

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

  var pinMapMainElementMousewodnHandler = function (event) {
    event.preventDefault();

    var startCoords = {
      x: event.clientX,
      y: event.clientY
    };

    var mouseMoveHandler = function (mouseEvent) {
      mouseEvent.preventDefault();

      var shift = {
        x: startCoords.x - mouseEvent.clientX,
        y: startCoords.y - mouseEvent.clientY
      };
      var objectPosTop = pinModule.pinMapMainElement.offsetTop - shift.y;
      var objectPosLeft = pinModule.pinMapMainElement.offsetLeft - shift.x;

      startCoords = {
        x: mouseEvent.clientX,
        y: mouseEvent.clientY
      };

      pinModule.pinMapMainElement.style.top = objectPosTop + 'px';
      pinModule.pinMapMainElement.style.left = objectPosLeft + 'px';
      formModule.formAddressElement.value = 'Координаты: ' +
        (objectPosTop - dataModule.pinLocationCorrection.mainX) + ' с севера и ' +
        (objectPosLeft + dataModule.pinLocationCorrection.mainY) + ' c запада';
    };

    var mouseUpHandler = function (upEvent) {
      upEvent.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  document.addEventListener('keydown', escKeydownHandler);
  pinModule.pinMapElement.addEventListener('click', pinMapClickHandler);
  pinModule.pinMapElement.addEventListener('keydown', pinMapKeydownHandler);
  cardModule.dialogCloseElement.addEventListener('click', closeClickHandler);
  cardModule.dialogCloseElement.addEventListener('keydown', closeKeydownHandler);
  pinModule.pinMapMainElement.addEventListener('mousedown', pinMapMainElementMousewodnHandler);
})();
