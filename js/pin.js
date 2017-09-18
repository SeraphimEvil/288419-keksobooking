'use strict';

(function () {
  var dataModule = window.data;
  var backendModule = window.backend;
  var renderErrorMessage = window.renderErrorMessage;

  var PINS_COUNT = 3;
  // var randomPins = [];


  var pinTemplateElement = document.querySelector('#pin-template').content;
  var pinMapElement = document.querySelector('.tokyo__pin-map');
  var pinMapMainElement = pinMapElement.querySelector('.pin.pin__main');
  var activePinElement;
  var filterContainer = document.querySelector('.tokyo__filters-container');

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

  var getRandomPins = function (pins) {
    var pinsCopy = pins.slice();
    var randomPins = [];

    for (var i = 0; i < PINS_COUNT; i++) {
      var pinsLength = pinsCopy.length;
      var pinPos = getRandomArrayPos(pinsLength);
      var pinElement = pinsCopy[pinPos];

      pinsCopy.splice(pinPos, 1);
      randomPins.push(pinElement);
    }

    return randomPins;
  };

  var getRandomArrayPos = function (arrLength) {
    return Math.floor(Math.random() * arrLength);
  };

  var renderLoadedPinMarkers = function (pins) {
    dataModule.pinMarkers = pins;
    var randomPins = getRandomPins(dataModule.pinMarkers);
    renderPinMarkers(randomPins);
    filterContainer.classList.remove('hidden');
  };

  var removeVisiblePinElement = function (element) {
    element.remove();
  };

  var renderPinMarkers = function (pins) {
    var visiblePinElements = pinMapElement.querySelectorAll('.pin:not(.pin__main)');
    var fragmentElement = document.createDocumentFragment();

    Array.prototype.forEach.call(visiblePinElements, removeVisiblePinElement);

    pins.forEach(function (element) {
      var dataNumber = dataModule.pinMarkers.indexOf(element);
      fragmentElement.appendChild(createPinMarker(element, dataNumber));
    });

    pinMapElement.appendChild(fragmentElement);
  };

  filterContainer.classList.add('hidden');
  backendModule.load(renderLoadedPinMarkers, renderErrorMessage);

  window.pin = {
    activePinElement: activePinElement,
    pinMapMainElement: pinMapMainElement,
    pinMapElement: pinMapElement,
    setActivePin: setActivePin,
    removeActivePin: removeActivePin,
    renderPinMarkers: renderPinMarkers
  };
})();
