'use strict';

(function () {
  var dataModule = window.data;
  var backendModule = window.backend;
  var renderErrorMessage = window.renderErrorMessage;

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

  var renderLoadedPinMarkers = function (pins) {
    dataModule.pinMarkersArray = pins;
    renderPinMarkers(pins);
    filterContainer.classList.remove('hidden');
  };

  var renderPinMarkers = function (pins) {
    var visiblePinsList = pinMapElement.querySelectorAll('.pin:not(.pin__main)');
    var visiblePinsArray = Array.prototype.slice.call(visiblePinsList);
    var fragmentElement = document.createDocumentFragment();

    visiblePinsArray.forEach(function (element) {
      element.remove();
    });

    pins.forEach(function (element) {
      var dataNumber = dataModule.pinMarkersArray.indexOf(element);
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
