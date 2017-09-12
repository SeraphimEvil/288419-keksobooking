'use strict';

(function () {
  var cardModule = window.card;
  var utilModule = window.util;
  var pinModule = window.pin;
  var formModule = window.form;
  var showCardModule = window.showCard;
  var dataModule = window.data;

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

  var mouseMoveHandler = function (event) {
    event.preventDefault();

    var shift = {
      x: currentCoords.x - event.clientX,
      y: currentCoords.y - event.clientY
    };

    currentCoords = {
      x: event.clientX,
      y: event.clientY
    };

    var mainPinPos = {
      x: calcMainPinPosX(shift.x),
      y: calcMainPinPosY(shift.y)
    };

    setMainPinPosCoords(mainPinPos);
    setAddressValue(mainPinPos);
  };

  var setMainPinPosCoords = function (mainPinPos) {
    pinModule.pinMapMainElement.style.top = mainPinPos.y + 'px';
    pinModule.pinMapMainElement.style.left = mainPinPos.x + 'px';
  };

  var setAddressValue = function (mainPinPos) {
    var addressPos = {
      x: Math.floor(mainPinPos.x + pinWidth / 2),
      y: Math.floor(mainPinPos.y + pinHeight)
    };

    formModule.formAddressElement.value = 'x: ' + addressPos.x + ', y: ' + addressPos.y;
  };

  var calcMainPinPosY = function (shiftY) {
    var pinElementTop = pinModule.pinMapMainElement.offsetTop - shiftY;

    if (pinElementTop < 0) {
      pinElementTop = 0;
      stopMouse();
    }

    if (pinElementTop > maxBottomPos) {
      pinElementTop = maxBottomPos;
      stopMouse();
    }

    return pinElementTop;
  };

  var calcMainPinPosX = function (shiftX) {
    var pinElementLeft = pinModule.pinMapMainElement.offsetLeft - shiftX;

    if (pinElementLeft < maxLeftPos) {
      pinElementLeft = maxLeftPos;
      stopMouse();
    }

    if (pinElementLeft > maxRightPos) {
      pinElementLeft = maxRightPos;
      stopMouse();
    }

    return pinElementLeft;
  };

  var mouseUpHandler = function () {
    if (formModule.formAddressElement.hasAttribute('style')) {
      formModule.formAddressElement.style.border = dataModule.inputStatus.IS_RIGHT;
    }

    stopMouse();
  };

  var stopMouse = function () {
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
  };

  document.addEventListener('keydown', escKeydownHandler);
  cardModule.dialogCloseElement.addEventListener('click', closeClickHandler);
  cardModule.dialogCloseElement.addEventListener('keydown', closeKeydownHandler);
  pinModule.pinMapMainElement.addEventListener('mousedown', pinMapMainElementMousedownHandler);
  showCardModule.addClickListener(pinModule.pinMapElement, cardModule.openDialog);
  showCardModule.addKeydownListener(pinModule.pinMapElement, cardModule.openDialog);
})();
