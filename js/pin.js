'use strict';

(function () {
  var dataModule = window.data;
  var backendModule = window.backend;
  var errorMessage = window.errorMessage;

  var pinTemplateElement = document.querySelector('#pin-template').content;
  var pinMapElement = document.querySelector('.tokyo__pin-map');
  var pinMapMainElement = pinMapElement.querySelector('.pin.pin__main');
  var activePinElement;

  var createPinMarker = function (pin, pinNumber) {
    var pinMarker = pinTemplateElement.cloneNode(true);
    var pinMarkerLocationX = pin.location.x - dataModule.pinLocationCorrection.X;
    var pinMarkerLocationY = pin.location.y - dataModule.pinLocationCorrection.Y;
    var pinMarkerItem = pinMarker.querySelector('.pin');

    pinMarkerItem.style.left = pinMarkerLocationX + 'px';
    pinMarkerItem.style.top = pinMarkerLocationY + 'px';
    pinMarker.querySelector('img.rounded').src = pin.author.avatar;
    pinMarkerItem.tabIndex = 0;
    pinMarkerItem.dataset.number = pinNumber;

    return pinMarker;
  };

  var setActivePin = function (item) {
    removeActivePin(item);
    activePinElement = item;
    activePinElement.classList.add('pin--active');
  };

  var removeActivePin = function () {
    if (activePinElement) {
      activePinElement.classList.remove('pin--active');
    }
  };

  var renderPinMarker = function (pins) {
    var fragmentElement = document.createDocumentFragment();

    for (var i = 0; i < pins.length; i++) {
      var currentPinMarker = pins[i];
      fragmentElement.appendChild(createPinMarker(currentPinMarker, i));
      dataModule.pinMarkerArr.push(currentPinMarker);
    }

    pinMapElement.appendChild(fragmentElement);
  };

  backendModule.load(renderPinMarker, errorMessage);

  window.pin = {
    activePinElement: activePinElement,
    pinMapMainElement: pinMapMainElement,
    pinMapElement: pinMapElement,
    setActivePin: setActivePin,
    removeActivePin: removeActivePin
  };
})();
