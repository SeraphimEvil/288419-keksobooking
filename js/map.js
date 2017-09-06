'use strict';

(function () {
  var housingType = {
    BUNGALO: 'bungalo',
    FLAT: 'flat',
    HOUSE: 'house',
    PALACE: 'palace'
  };

  var roomsCount = {
    ONE: '1',
    TWO: '2',
    THREE: '3',
    ALL: '100'
  };

  var pinLocationCorrection = {
    X: 28,
    Y: 75
  };

  var keyCode = {
    ESC: 27,
    ENTER: 13
  };

  var authorAvatars = ['01', '02', '03', '04', '05', '06', '07', '08'];
  var offerTitles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var offerTypes = ['flat', 'house', 'bungalo'];
  var offerTimes = ['12:00', '13:00', '14:00'];
  var offerFeauteres = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var pinMarkerArr = [];
  var PINS_COUNT = authorAvatars.length;

  var pinTemplateElement = document.querySelector('#pin-template').content;
  var lodgeTemplateElement = document.querySelector('#lodge-template').content;
  var pinMapElement = document.querySelector('.tokyo__pin-map');
  var pinMapMainElement = pinMapElement.querySelector('.pin.pin__main');
  var dialogElement = document.querySelector('#offer-dialog');
  var lodgePanelAvatar = dialogElement.querySelector('.dialog__title img');
  var dialogCloseElement = dialogElement.querySelector('.dialog__close');
  var activePinElement;

  var checkInElement = document.querySelector('#timein');
  var checkOutElement = document.querySelector('#timeout');
  var housingTypeElement = document.querySelector('#type');
  var priceCountElement = document.querySelector('#price');
  var roomNumberElement = document.querySelector('#room_number');
  var capacityCountElement = document.querySelector('#capacity');
  var offerTitleElement = document.querySelector('#title');

  var formOfferElement = document.querySelector('.notice__form');

  var getRandomArrayPos = function (array) {
    return Math.floor(Math.random() * array.length);
  };

  var getRandomNumber = function (min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  };

  var getRandomItems = function (array) {
    var randomItemsCount = getRandomNumber(1, array.length);
    var randomItems = [];

    for (var j = 0; j < randomItemsCount; j++) {
      randomItems.push(getArrayElement(array));
    }

    return randomItems;
  };

  var getArrayElement = function (array) {
    var arrayListPos = getRandomArrayPos(array);
    var arrayElement = array.splice(arrayListPos, 1);
    return arrayElement;
  };

  var getRandomArrayElement = function (array) {
    return array[getRandomArrayPos(array)];
  };

  var createRandomPin = function () {
    var locationX = getRandomNumber(300, 900);
    var locationY = getRandomNumber(100, 500);

    return {
      author: {
        avatar: 'img/avatars/user' + getArrayElement(authorAvatars) + '.png'
      },
      offer: {
        title: getArrayElement(offerTitles),
        address: locationX + ', ' + locationY,
        price: getRandomNumber(1000, 1000000),
        type: getRandomArrayElement(offerTypes),
        rooms: getRandomNumber(1, 5),
        guests: getRandomNumber(1, 10),
        checkin: getRandomArrayElement(offerTimes),
        checkout: getRandomArrayElement(offerTimes),
        features: getRandomItems(offerFeauteres),
        description: '',
        photos: []
      },
      location: {
        x: locationX,
        y: locationY
      }
    };
  };

  var getPinOfferTypeTranslate = function (offerType) {
    switch (offerType) {
      case housingType.FLAT:
        offerType = 'Квартира';
        break;

      case housingType.HOUSE:
        offerType = 'Дом';
        break;

      case housingType.BUNGALO:
        offerType = 'Бунгало';
        break;
      default:
        offerType = 'Не определено';
    }

    return offerType;
  };

  var renderPinOfferFeauteres = function (features) {
    return features.map(function (item) {
      return '<span class="feature__image feature__image--' + item + '"></span>';
    }).join('');
  };

  var createPinMarker = function (pin, pinNumber) {
    var pinMarker = pinTemplateElement.cloneNode(true);
    var pinMarkerLocationX = pin.location.x + pinLocationCorrection.X;
    var pinMarkerLocationY = pin.location.y - pinLocationCorrection.Y;
    var pinMarkerItem = pinMarker.querySelector('.pin');

    pinMarkerItem.style.left = pinMarkerLocationX + 'px';
    pinMarkerItem.style.top = pinMarkerLocationY + 'px';
    pinMarker.querySelector('img.rounded').src = pin.author.avatar;
    pinMarkerItem.tabIndex = 0;
    pinMarkerItem.dataset.number = pinNumber;

    return pinMarker;
  };

  var renderLodge = function (pin) {
    var lodgeElement = lodgeTemplateElement.cloneNode(true);
    var lodgeTitle = pin.offer.title;
    var lodgeAddress = pin.offer.address;
    var lodgePrice = pin.offer.price + '  &#x20bd;/ночь';
    var lodgeType = getPinOfferTypeTranslate(pin.offer.type);
    var lodgeGuestsAndRooms = 'Для ' + pin.offer.guests + ' гостей в ' + pin.offer.rooms + ' комнатах';
    var lodgeCheckinCheckout = 'Заезд после ' + pin.offer.checkin + ', выезд до ' + pin.offer.checkout;
    var lodgeFeatures = renderPinOfferFeauteres(pin.offer.features);
    var lodgeDescription = pin.offer.description;

    lodgeElement.querySelector('.lodge__title').textContent = lodgeTitle;
    lodgeElement.querySelector('.lodge__address').textContent = lodgeAddress;
    lodgeElement.querySelector('.lodge__price').innerHTML = lodgePrice;
    lodgeElement.querySelector('.lodge__type').textContent = lodgeType;
    lodgeElement.querySelector('.lodge__rooms-and-guests').textContent = lodgeGuestsAndRooms;
    lodgeElement.querySelector('.lodge__checkin-time').textContent = lodgeCheckinCheckout;
    lodgeElement.querySelector('.lodge__features').innerHTML = lodgeFeatures;
    lodgeElement.querySelector('.lodge__description').textContent = lodgeDescription;

    return lodgeElement;
  };

  var renderPinMarkers = function () {
    var fragmentElement = document.createDocumentFragment();

    for (var i = 0; i < PINS_COUNT; i++) {
      var currentPinMarker = createRandomPin();

      fragmentElement.appendChild(createPinMarker(currentPinMarker, i));
      pinMarkerArr.push(currentPinMarker);
    }

    pinMapElement.appendChild(fragmentElement);
  };

  var renderLodgeView = function (num) {
    var lodgePanelElement = dialogElement.querySelector('.dialog__panel');
    var lodgePanelItem = pinMarkerArr[num];

    dialogElement.replaceChild(renderLodge(lodgePanelItem), lodgePanelElement);
    lodgePanelAvatar.src = lodgePanelItem.author.avatar;
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

  var getPinNumber = function (item) {
    return parseInt(item.getAttribute('data-number'), 10);
  };

  var openDialog = function () {
    var target = event.target;

    if (!target.classList.contains('pin') && target.parentNode.classList.contains('pin')) {
      target = target.parentNode;
    }

    if (target === activePinElement || target === pinMapMainElement) {
      return;
    }

    setActivePin(target);
    renderLodgeView(getPinNumber(target));
    dialogElement.classList.remove('hidden');
  };

  var pinMapClickHandler = function (event) {
    openDialog(event);
  };

  var pinMapKeydownHandler = function (event) {
    if (event.keyCode === keyCode.ENTER) {
      openDialog(event);
    }
  };

  var closeDialog = function () {
    dialogElement.classList.add('hidden');
    removeActivePin();
  };

  var closeClickHandler = function (event) {
    event.preventDefault();
    closeDialog();
  };

  var closeKeydownHandler = function (event) {
    if (event.keyCode === keyCode.ENTER) {
      closeDialog();
    }
  };

  var escKeydownHandler = function (event) {
    if (event.keyCode === keyCode.ESC) {
      closeDialog();
    }
  };

  var checkInElementChangeHandler = function () {
    checkOutElement.value = checkInElement.value;
  };

  var checkHousingType = function () {
    switch (housingTypeElement.value) {
      case housingType.BUNGALO:
        priceCountElement.min = 0;
        break;
      case housingType.FLAT:
        priceCountElement.min = 1000;
        break;
      case housingType.HOUSE:
        priceCountElement.min = 5000;
        break;
      case housingType.PALACE:
        priceCountElement.min = 10000;
        break;
      default:
        priceCountElement.min = 0;
    }
  };

  var housingTypeElementChangeHandler = function () {
    checkHousingType();
  };

  var checkRoomNumber = function () {
    var roomsValue;
    switch (roomNumberElement.value) {
      case roomsCount.ONE:
        roomsValue = 1;
        break;
      case roomsCount.TWO:
        roomsValue = getRandomNumber(1, 2);
        break;
      case roomsCount.THREE:
        roomsValue = getRandomNumber(1, 3);
        break;
      case roomsCount.ALL:
        roomsValue = 0;
        break;
      default:
        roomsValue = 1;
    }

    capacityCountElement.value = roomsValue;
  };

  var roomNumberElementChangeHandler = function () {
    checkRoomNumber();
  };

  var offerTitleElementInputHandler = function (event) {
    var inputField = event.target;
    var inputLength = inputField.value.length;
    var customValidityMessage = '';

    if (inputLength < 30) {
      customValidityMessage = 'Минимальное допустимое количество символов: 30';
    } else if (inputLength > 100) {
      customValidityMessage = 'Максимальное допустимое количество символов: 100';
    }

    inputField.setCustomValidity(customValidityMessage);
  };

  var formOfferElementSubmitHandler = function (event) {
    event.preventDefault();
    var isValid = false;

    checkHousingType();
    checkRoomNumber();

    if (priceCountElement.validity.valid && capacityCountElement.validity.valid) {
      isValid = true;
    }

    if (isValid) {
      formOfferElement.submit();
      formOfferElement.reset();
    }
  };

  closeDialog();
  renderPinMarkers();

  document.addEventListener('keydown', escKeydownHandler);
  pinMapElement.addEventListener('click', pinMapClickHandler);
  pinMapElement.addEventListener('keydown', pinMapKeydownHandler);
  dialogCloseElement.addEventListener('click', closeClickHandler);
  dialogCloseElement.addEventListener('keydown', closeKeydownHandler);
  checkInElement.addEventListener('change', checkInElementChangeHandler);
  housingTypeElement.addEventListener('change', housingTypeElementChangeHandler);
  roomNumberElement.addEventListener('change', roomNumberElementChangeHandler);
  offerTitleElement.addEventListener('input', offerTitleElementInputHandler);
  formOfferElement.addEventListener('submit', formOfferElementSubmitHandler);
})();
