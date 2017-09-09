'use strict';

(function () {
  var cardModule = window.card;
  var utilModule = window.util;
  var pinModule = window.pin;
  var formModule = window.form;

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

      var pinElementTop = pinModule.pinMapMainElement.offsetTop - shift.y;
      var pinElementLeft = pinModule.pinMapMainElement.offsetLeft - shift.x;
      var mapElement = document.querySelector('.tokyo');
      var filtesElement = document.querySelector('.tokyo__filters-container');
      var mapWidth = mapElement.offsetWidth;
      var mapHeight = mapElement.offsetHeight - filtesElement.offsetHeight;
      var pinWidth = pinModule.pinMapMainElement.offsetWidth;
      var pinHeight = pinModule.pinMapMainElement.offsetHeight;

      startCoords = {
        x: mouseEvent.clientX,
        y: mouseEvent.clientY
      };

      var getMainPinPosY = function () {
        if (pinElementTop < 0) {
          pinElementTop = 0;
          mouseUpHandler(mouseEvent);
        }

        if (pinElementTop > mapHeight - pinHeight) {
          pinElementTop = mapHeight - pinHeight;
          mouseUpHandler(mouseEvent);
        }

        return pinElementTop;
      };

      var getMainPinPosX = function () {
        if (pinElementLeft < 0) {
          pinElementLeft = 0;
          mouseUpHandler(mouseEvent);
        }

        if (pinElementLeft > mapWidth - pinWidth) {
          pinElementLeft = mapWidth - pinWidth;
          mouseUpHandler(mouseEvent);
        }

        return pinElementLeft;
      };

      pinModule.pinMapMainElement.style.top = getMainPinPosY() + 'px';
      pinModule.pinMapMainElement.style.left = getMainPinPosX() + 'px';
      formModule.formAddressElement.value = 'x: ' + (getMainPinPosX() + pinWidth / 2)
         + ', y: ' + (getMainPinPosY() + pinHeight);
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
