'use strict';

(function () {
  var backendModule = window.backend;
  var dataModule = window.data;
  var synchronizeFieldsModule = window.synchronizeFields;

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
        minPriceValue = dataModule.prices.FIVE_THOUSAND;
        break;
      case dataModule.housingType.PALACE:
        minPriceValue = dataModule.prices.TEN_THOUSAND;
    }

    element.min = minPriceValue;
  };

  var syncCapacityCount = function (element, value) {
    var roomsValue = 1;

    switch (value) {
      case dataModule.roomsCount.TWO:
        roomsValue = getRandomNumber(1, 2);
        break;
      case dataModule.roomsCount.THREE:
        roomsValue = getRandomNumber(1, 3);
        break;
      case dataModule.roomsCount.ALL:
        roomsValue = 0;
    }

    element.value = roomsValue;
  };

  var syncRoomCount = function (element, value) {

    var capacityValue = 1;

    switch (value) {
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

    element.value = capacityValue;
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

  var sendForm = function () {
    // console.log('йа отправилос!');
    setTimeout(function () {
      formOfferElement.reset();
    });
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var formOfferElementSubmitHandler = function (event) {
    event.preventDefault();

    syncMinPrice(priceCountElement, housingTypeElement.value);
    syncCapacityCount(capacityCountElement, roomNumberElement.value);

    var isValid = priceCountElement.validity.valid && formAddressElement.value !== '';

    if (formAddressElement.value === '') {
      formAddressElement.style.border = dataModule.inputStatus.IS_ERROR;
    }

    if (!isValid) {
      // console.log('тут ошибко!')
    } else {
      backendModule.save(new FormData(formOfferElement), sendForm, errorHandler);
    }
  };

  synchronizeFieldsModule(checkInElement, checkOutElement, syncValue);
  synchronizeFieldsModule(checkOutElement, checkInElement, syncValue);
  synchronizeFieldsModule(housingTypeElement, priceCountElement, syncMinPrice);
  synchronizeFieldsModule(roomNumberElement, capacityCountElement, syncCapacityCount);
  synchronizeFieldsModule(capacityCountElement, roomNumberElement, syncRoomCount);
  offerTitleElement.addEventListener('input', offerTitleElementInputHandler);
  formOfferElement.addEventListener('submit', formOfferElementSubmitHandler);

  window.form = {
    formAddressElement: formAddressElement
  };
})();
