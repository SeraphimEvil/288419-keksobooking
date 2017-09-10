'use strict';

(function () {
  var cardModule = window.card;
  var utilModule = window.util;
  var pinModule = window.pin;
  var formModule = window.form;

  var mapElement = document.querySelector('.tokyo');
  var filtesElement = document.querySelector('.tokyo__filters-container');
  var mapWidth = mapElement.offsetWidth;
  var mapHeight = mapElement.offsetHeight - filtesElement.offsetHeight;
  var pinWidth = pinModule.pinMapMainElement.offsetWidth;
  var pinHeight = pinModule.pinMapMainElement.offsetHeight;
  var startCoords = {};

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

  var pinMapMainElementMousedownHandler = function (event) {
    event.preventDefault();

    startCoords = {
      x: event.clientX,
      y: event.clientY
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  var mouseMoveHandler = function (mouseEvent) {
    mouseEvent.preventDefault();

    var shift = {
      x: startCoords.x - mouseEvent.clientX,
      y: startCoords.y - mouseEvent.clientY
    };

    startCoords = {
      x: mouseEvent.clientX,
      y: mouseEvent.clientY
    };

    var pinElementTop = pinModule.pinMapMainElement.offsetTop - shift.y;
    var pinElementLeft = pinModule.pinMapMainElement.offsetLeft - shift.x;

    pinModule.pinMapMainElement.style.top = getMainPinPosY(pinElementTop) + 'px';
    pinModule.pinMapMainElement.style.left = getMainPinPosX(pinElementLeft) + 'px';
    formModule.formAddressElement.value = 'x: ' + Math.floor(getMainPinPosX(pinElementLeft) + pinWidth / 2)
       + ', y: ' + Math.floor(getMainPinPosY(pinElementTop) + pinHeight);
  };

  var getMainPinPosY = function (pinElementTop) {
    if (pinElementTop < 0) {
      pinElementTop = 0;
      mouseUpHandler();
    }

    if (pinElementTop > mapHeight - pinHeight) {
      pinElementTop = mapHeight - pinHeight;
      mouseUpHandler();
    }

    return pinElementTop;
  };

  var getMainPinPosX = function (pinElementLeft) {
    if (pinElementLeft < 0) {
      pinElementLeft = 0;
      mouseUpHandler();
    }

    if (pinElementLeft > mapWidth - pinWidth) {
      pinElementLeft = mapWidth - pinWidth;
      mouseUpHandler();
    }

    return pinElementLeft;
  };

  var mouseUpHandler = function () {
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
  };

  document.addEventListener('keydown', escKeydownHandler);
  pinModule.pinMapElement.addEventListener('click', pinMapClickHandler);
  pinModule.pinMapElement.addEventListener('keydown', pinMapKeydownHandler);
  cardModule.dialogCloseElement.addEventListener('click', closeClickHandler);
  cardModule.dialogCloseElement.addEventListener('keydown', closeKeydownHandler);
  pinModule.pinMapMainElement.addEventListener('mousedown', pinMapMainElementMousedownHandler);
})();
