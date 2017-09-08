'use strict';

(function () {
  var checkInElement = document.querySelector('#timein');
  var checkOutElement = document.querySelector('#timeout');
  var housingTypeElement = document.querySelector('#type');
  var priceCountElement = document.querySelector('#price');
  var roomNumberElement = document.querySelector('#room_number');
  var capacityCountElement = document.querySelector('#capacity');
  var offerTitleElement = document.querySelector('#title');
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
    var minPriceValue = window.data.prices.ZERO;

    switch (housingTypeElement.value) {
      case window.data.housingType.FLAT:
        minPriceValue = window.data.prices.ONE_THOUSAND;
        break;
      case window.data.housingType.HOUSE:
        minPriceValue = window.data.prices.FIVE_THOUSAND;
        break;
      case window.data.housingType.PALACE:
        minPriceValue = window.data.prices.TEN_THOUSAND;
    }

    priceCountElement.min = minPriceValue;
  };

  var housingTypeElementChangeHandler = function () {
    checkHousingType();
  };

  var checkRoomNumber = function () {
    var roomsValue = 1;

    switch (roomNumberElement.value) {
      case window.data.roomsCount.TWO:
        roomsValue = getRandomNumber(1, 2);
        break;
      case window.data.roomsCount.THREE:
        roomsValue = getRandomNumber(1, 3);
        break;
      case window.data.roomsCount.ALL:
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
      case window.data.capacityCount.ONE:
        capacityValue = getRandomNumber(1, 3);
        break;
      case window.data.capacityCount.TWO:
        capacityValue = getRandomNumber(2, 3);
        break;
      case window.data.capacityCount.THREE:
        capacityValue = 3;
        break;
      case window.data.capacityCount.ZERO:
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
})();
