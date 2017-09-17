'use strict';

(function () {
  var backendModule = window.backend;
  var dataModule = window.data;
  var synchronizeFieldsModule = window.synchronizeFields;
  var renderErrorMessage = window.renderErrorMessage;

  var checkInElement = document.querySelector('#timein');
  var checkOutElement = document.querySelector('#timeout');
  var housingTypeElement = document.querySelector('#type');
  var priceCountElement = document.querySelector('#price');
  var roomNumberElement = document.querySelector('#room_number');
  var capacityCountElement = document.querySelector('#capacity');
  var offerTitleElement = document.querySelector('#title');
  var formAddressElement = document.querySelector('#address');
  var formOfferElement = document.querySelector('.notice__form');

  var syncValue = function (element, value) {
    element.value = value;
  };

  var syncMinPrice = function (element, value) {
    var minPriceValue = dataModule.prices.ZERO;

    switch (value) {
      case dataModule.housingType.FLAT:
        minPriceValue = dataModule.prices.ONE_THOUSAND;
        break;
      case dataModule.housingType.HOUSE:
        minPriceValue = dataModule.prices.TEN_THOUSAND;
        break;
      case dataModule.housingType.PALACE:
        minPriceValue = dataModule.prices.TEN_THOUSAND;
    }

    element.min = minPriceValue;
  };

  var syncCapacityCount = function (roomsNumber) {
    var availableValues = dataModule.AVAILABLE_GUESTS[roomsNumber];
    var guestsCount = 0;
    var capacityCountOptions = capacityCountElement.querySelectorAll('option');

    Array.prototype.forEach.call(capacityCountOptions, function (element) {
      if (availableValues.indexOf(element.value) === -1) {
        element.hidden = true;
      } else {
        element.hidden = false;
        guestsCount = element.value > guestsCount ? element.value : guestsCount;
      }
    });

    capacityCountElement.value = guestsCount;
  };

  var roomNumberElementChangeHandler = function () {
    syncCapacityCount(roomNumberElement.value);
  };

  var offerTitleElementInputHandler = function () {
    var inputLength = offerTitleElement.value.length;
    var customValidityMessage = '';

    if (inputLength < 30) {
      customValidityMessage = 'Минимальное допустимое количество символов: 30';
    } else if (inputLength > 100) {
      customValidityMessage = 'Максимальное допустимое количество символов: 100';
    }

    offerTitleElement.setCustomValidity(customValidityMessage);
  };

  var resetForm = function () {
    setTimeout(function () {
      formOfferElement.reset();
    });
  };

  var formOfferElementSubmitHandler = function (event) {
    event.preventDefault();

    var isValid = priceCountElement.validity.valid && formAddressElement.value !== '';

    if (formAddressElement.value === '') {
      formAddressElement.style.border = dataModule.inputStatus.IS_ERROR;
    }

    if (isValid) {
      backendModule.save(new FormData(formOfferElement), resetForm, renderErrorMessage);
    }
  };

  synchronizeFieldsModule(checkInElement, checkOutElement, syncValue);
  synchronizeFieldsModule(checkOutElement, checkInElement, syncValue);
  synchronizeFieldsModule(housingTypeElement, priceCountElement, syncMinPrice);
  roomNumberElement.addEventListener('change', roomNumberElementChangeHandler);
  offerTitleElement.addEventListener('input', offerTitleElementInputHandler);
  formOfferElement.addEventListener('submit', formOfferElementSubmitHandler);

  window.form = {
    formAddressElement: formAddressElement
  };
})();
