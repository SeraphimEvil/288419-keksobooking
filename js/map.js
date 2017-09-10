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
  var currentCoords = {};
  var maxLeftPos = -(pinWidth / 2);
  var maxRightPos = mapWidth - pinWidth / 2;
  var maxBottomPos = mapHeight - pinHeight;

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

    currentCoords = {
      x: event.clientX,
      y: event.clientY
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  var mouseMoveHandler = function (mouseEvent) {
    mouseEvent.preventDefault();

    var shift = {
      x: currentCoords.x - mouseEvent.clientX,
      y: currentCoords.y - mouseEvent.clientY
    };

    currentCoords = {
      x: mouseEvent.clientX,
      y: mouseEvent.clientY
    };

    var mainPinPos = {
      x: calcMainPinPosX(shift.x),
      y: calcMainPinPosY(shift.y)
    };

    setMainPinPosCoords(mainPinPos.x, mainPinPos.y);
    setAddressValue(mainPinPos.x, mainPinPos.y);
  };

  var setMainPinPosCoords = function (posX, posY) {
    pinModule.pinMapMainElement.style.top = posY + 'px';
    pinModule.pinMapMainElement.style.left = posX + 'px';
  };

  var setAddressValue = function (posX, posY) {
    var addressPos = {
      x: Math.floor(posX + pinWidth / 2),
      y: Math.floor(posY + pinHeight)
    };

    formModule.formAddressElement.value = 'x: ' + addressPos.x + ', y: ' + addressPos.y;
  };

  var calcMainPinPosY = function (shiftY) {
    var pinElementTop = pinModule.pinMapMainElement.offsetTop - shiftY;

    if (pinElementTop < 0) {
      pinElementTop = 0;
      mouseUpHandler(event);
    }

    if (pinElementTop > maxBottomPos) {
      pinElementTop = maxBottomPos;
      mouseUpHandler(event);
    }

    return pinElementTop;
  };

  var calcMainPinPosX = function (shiftX) {
    var pinElementLeft = pinModule.pinMapMainElement.offsetLeft - shiftX;

    if (pinElementLeft < maxLeftPos) {
      pinElementLeft = maxLeftPos;
      mouseUpHandler(event);
    }

    if (pinElementLeft > maxRightPos) {
      pinElementLeft = maxRightPos;
      mouseUpHandler(event);
    }

    return pinElementLeft;
  };

  var mouseUpHandler = function (event) {
    event.preventDefault();
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
