'use strict';

(function () {
  var dataModule = window.data;
  var backendModule = window.backend;
  var renderErrorMessage = window.renderErrorMessage;

  var PINS_COUNT = 3;

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

  var getRandomNumbers = function (pins) {
    var pinsLength = pins.length;
    var nums = [];

    while (nums.length < PINS_COUNT) {
      var randomNumber = getRandomNumber(1, pinsLength);

      if (nums.indexOf(randomNumber) === -1) {
        nums.push(randomNumber);
      }
    }

    return nums;
  };

  var getRandomNumber = function (min, max) {
    return Math.floor(min + Math.random() * (max - min));
  };

  var getRandomPins = function (indexPins) {
    return indexPins.map(function (element) {
      return dataModule.pinMarkers[element];
    });
  };

  var renderLoadedPinMarkers = function (pins) {
    var randomNumbers = getRandomNumbers(pins);
    dataModule.pinMarkers = pins;

    filterContainer.classList.remove('hidden');
    renderPinMarkers(getRandomPins(randomNumbers));
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
