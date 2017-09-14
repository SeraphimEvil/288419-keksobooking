'use strict';

(function () {
  var dataModule = window.data;
  var pinModule = window.pin;
  var cardModule = window.card;
  var startDebounce = window.startDebounce;

  var mapFilter = document.querySelector('.tokyo__filters');
  var housingType = mapFilter.querySelector('#housing_type');
  var housingPrice = mapFilter.querySelector('#housing_price');
  var housingRoomNumber = mapFilter.querySelector('#housing_room-number');
  var housingGuestNumber = mapFilter.querySelector('#housing_guests-number');
  var housingFeaturesList = mapFilter.querySelectorAll('#housing_features input[type="checkbox"]');
  var housingFeaturesArr = Array.prototype.slice.call(housingFeaturesList);

  var filterByValue = function (pin, filterValue, filterName, isInt) {
    return filterValue === 'any' || (isInt ? pin.offer[filterName] === parseInt(filterValue, 10) : pin.offer[filterName] === filterValue);
  };

  var filterByPrice = function (pin) {
    switch (housingPrice.value) {
      case 'low':
        return pin.offer.price < dataModule.filterPrices.MIDDLE_START;
      case 'high':
        return pin.offer.price > dataModule.filterPrices.HIGH_START;
      case 'middle':
        return pin.offer.price > dataModule.filterPrices.MIDDLE_START && pin.offer.price < dataModule.filterPrices.HIGH_START;
      default:
        return pin.offer.price;
    }
  };

  var filterByFeatures = function (pin) {
    var checkedFeatures = [];

    pushInCheckedFeatures(checkedFeatures);

    if (checkedFeatures.length) {
      var isChecked = true;

      checkedFeatures.forEach(function (element) {
        if (pin.offer.features.indexOf(element) === -1) {
          isChecked = false;
        }
      });

      return isChecked;
    }

    return true;
  };

  var pushInCheckedFeatures = function (checkedFeatures) {
    housingFeaturesArr.forEach(function (element) {
      if (element.checked) {
        checkedFeatures.push(element.value);
      }
    });

    return checkedFeatures;
  };

  var getFilteredPins = function () {
    return dataModule.pinMarkerArr.filter(function (pin) {
      if (filterByValue(pin, housingType.value, 'type')) {
        if (filterByValue(pin, housingRoomNumber.value, 'rooms', true)) {
          if (filterByValue(pin, housingGuestNumber.value, 'guests', true)) {
            if (filterByPrice(pin)) {
              if (filterByFeatures(pin)) {
                return pin;
              }
            }
          }
        }
      }

      return false;
    });
  };

  var startFiltration = function () {
    var filteredPins = getFilteredPins();

    pinModule.renderPinMarkers(filteredPins);
    cardModule.closeDialog();
  };

  housingType.addEventListener('change', function () {
    startDebounce(startFiltration);
  });

  housingPrice.addEventListener('change', function () {
    startDebounce(startFiltration);
  });

  housingRoomNumber.addEventListener('change', function () {
    startDebounce(startFiltration);
  });

  housingGuestNumber.addEventListener('change', function () {
    startDebounce(startFiltration);
  });

  housingFeaturesArr.forEach(function (element) {
    element.addEventListener('change', function () {
      startDebounce(startFiltration);
    });
  });
})();
