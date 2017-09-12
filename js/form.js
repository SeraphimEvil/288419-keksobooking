'use strict';

(function () {
  var dataModule = window.data;

  var checkInElement = document.querySelector('#timein');
  var checkOutElement = document.querySelector('#timeout');
  var housingTypeElement = document.querySelector('#type');
  var priceCountElement = document.querySelector('#price');
  var roomNumberElement = document.querySelector('#room_number');
  var capacityCountElement = document.querySelector('#capacity');
  var offerTitleElement = document.querySelector('#title');
  var formAddressElement = document.querySelector('#address');
  var formOfferElement = document.querySelector('.notice__form');

  var getRandomNumber = function (min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  };

  var checkInElementChangeHandler = function () {
    checkOutElement.value = checkInElement.value;
  };

  var checkOutElementChangeHandler = function () {
    checkInElement.value = checkOutElement.value;
  };

  var checkHousingType = function () {
    var minPriceValue = dataModule.prices.ZERO;

    switch (housingTypeElement.value) {
      case dataModule.housingType.FLAT:
        minPriceValue = dataModule.prices.ONE_THOUSAND;
        break;
      case dataModule.housingType.HOUSE:
        minPriceValue = dataModule.prices.FIVE_THOUSAND;
        break;
      case dataModule.housingType.PALACE:
        minPriceValue = dataModule.prices.TEN_THOUSAND;
    }

    priceCountElement.min = minPriceValue;
  };

  var housingTypeElementChangeHandler = function () {
    checkHousingType();
  };

  var checkRoomNumber = function () {
    var roomsValue = 1;

    switch (roomNumberElement.value) {
      case dataModule.roomsCount.TWO:
        roomsValue = getRandomNumber(1, 2);
        break;
      case dataModule.roomsCount.THREE:
        roomsValue = getRandomNumber(1, 3);
        break;
      case dataModule.roomsCount.ALL:
        roomsValue = 0;
    }

    capacityCountElement.value = roomsValue;
  };

  var roomNumberElementChangeHandler = function () {
    checkRoomNumber();
  };

  var checkCapacityCount = function () {
    var capacityValue = 1;

    switch (capacityCountElement.value) {
      case dataModule.capacityCount.ONE:
        capacityValue = getRandomNumber(1, 3);
        break;
      case dataModule.capacityCount.TWO:
        capacityValue = getRandomNumber(2, 3);
        break;
      case dataModule.capacityCount.THREE:
        capacityValue = 3;
        break;
      case dataModule.capacityCount.ZERO:
        capacityValue = 100;
    }

    roomNumberElement.value = capacityValue;
  };

  var capacityCountElementChangeHandler = function () {
    checkCapacityCount();
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

  var formOfferElementSubmitHandler = function (event) {
    var isValid = false;

    checkHousingType();
    checkRoomNumber();

    isValid = priceCountElement.validity.valid && capacityCountElement.validity.valid;

    if (!isValid) {
      event.preventDefault();
    } else {
      setTimeout(function () {
        formOfferElement.reset();
      });
    }
  };

  checkInElement.addEventListener('change', checkInElementChangeHandler);
  checkOutElement.addEventListener('change', checkOutElementChangeHandler);
  housingTypeElement.addEventListener('change', housingTypeElementChangeHandler);
  roomNumberElement.addEventListener('change', roomNumberElementChangeHandler);
  capacityCountElement.addEventListener('change', capacityCountElementChangeHandler);
  offerTitleElement.addEventListener('input', offerTitleElementInputHandler);
  formOfferElement.addEventListener('submit', formOfferElementSubmitHandler);

  window.form = {
    formAddressElement: formAddressElement
  };
})();
