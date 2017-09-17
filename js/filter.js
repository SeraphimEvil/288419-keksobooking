'use strict';

(function () {
  var dataModule = window.data;
  var pinModule = window.pin;
  var cardModule = window.card;
  var startDebounce = window.startDebounce;

  var mapFilterElement = document.querySelector('.tokyo__filters');
  var housingTypeElement = mapFilterElement.querySelector('#housing_type');
  var housingPriceElement = mapFilterElement.querySelector('#housing_price');
  var housingRoomNumberElement = mapFilterElement.querySelector('#housing_room-number');
  var housingGuestNumberElement = mapFilterElement.querySelector('#housing_guests-number');
  var housingFeaturesList = mapFilterElement.querySelectorAll('#housing_features input[type="checkbox"]');
  var housingFeaturesArr = Array.prototype.slice.call(housingFeaturesList);

  var filterByValue = function (pin, filterValue, filterName) {
    if (filterValue !== dataModule.filterValues.ANY) {
      switch (filterName) {
        case dataModule.filterValues.TYPE:
          return pin.offer[filterName] === filterValue;
        case dataModule.filterValues.ROOMS:
          return pin.offer[filterName] === parseInt(filterValue, 10);
        default:
          return pin.offer[filterName] === parseInt(filterValue, 10);
      }
    }

    return true;
  };

  var filterByPrice = function (pin) {
    switch (housingPriceElement.value) {
      case dataModule.filterPricesCategory.LOW:
        return pin.offer.price < dataModule.filterPrices.MIDDLE_START;
      case dataModule.filterPricesCategory.HIGH:
        return pin.offer.price > dataModule.filterPrices.HIGH_START;
      case dataModule.filterPricesCategory.MIDDLE:
        return pin.offer.price >= dataModule.filterPrices.MIDDLE_START && pin.offer.price <= dataModule.filterPrices.HIGH_START;
      default:
        return true;
    }
  };

  var filterByFeatures = function (pin) {
    var isCheckedFeatures = housingFeaturesArr
        .filter(function (element) {
          return element.checked;
        })
        .every(function (element) {
          return pin.offer.features.indexOf(element.value) !== -1;
        });

    return isCheckedFeatures;
  };

  var getFilteredPins = function () {
    return dataModule.pinMarkersArray.filter(function (pin) {
      return filterByValue(pin, housingTypeElement.value, 'type')
          && filterByValue(pin, housingRoomNumberElement.value, 'rooms')
          && filterByValue(pin, housingGuestNumberElement.value, 'guests')
          && filterByPrice(pin)
          && filterByFeatures(pin);
    });
  };

  var startFiltration = function () {
    var filteredPins = getFilteredPins();

    pinModule.renderPinMarkers(filteredPins);
    cardModule.closeDialog();
  };

  mapFilterElement.addEventListener('change', function () {
    startDebounce(startFiltration);
  });
})();
