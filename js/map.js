'use strict';

(function () {
  var PIN_LOCATION_X_CORRECTION = 28;
  var PIN_LOCATION_Y_CORRECTION = 75;

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

  var pinTemplate = document.querySelector('#pin-template').content;
  var lodgeTemplate = document.querySelector('#lodge-template').content;
  var pinMap = document.querySelector('.tokyo__pin-map');
  var dialogElement = document.querySelector('#offer-dialog');
  var dialogElementClose = dialogElement.querySelector('.dialog__close');
  var activePinElement;

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
      case 'flat':
        offerType = 'Квартира';
        break;

      case 'house':
        offerType = 'Дом';
        break;

      case 'bungalo':
        offerType = 'Бунгало';
    }

    return offerType;
  };

  var renderPinOfferFeauteres = function (features) {
    return features.map(function (item) {
      return '<span class="feature__image feature__image--' + item + '"></span>';
    }).join('');
  };

  var renderPinMarker = function (pin, pinNumber) {
    var pinMarker = pinTemplate.cloneNode(true);
    var pinMarkerLocationX = pin.location.x + PIN_LOCATION_X_CORRECTION;
    var pinMarkerLocationY = pin.location.y - PIN_LOCATION_Y_CORRECTION;
    var pinMarkerItem = pinMarker.querySelector('.pin');

    pinMarkerItem.style.left = pinMarkerLocationX + 'px';
    pinMarkerItem.style.top = pinMarkerLocationY + 'px';
    pinMarker.querySelector('img.rounded').src = pin.author.avatar;
    pinMarkerItem.setAttribute('tabindex', '0');
    pinMarkerItem.setAttribute('data-number', pinNumber);

    return pinMarker;
  };

  var renderLodge = function (pin) {
    var lodgeElement = lodgeTemplate.cloneNode(true);
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

  var setPinMarker = function () {
    var fragment = document.createDocumentFragment();
    var pinNumber = 0;

    for (var i = 0; i < PINS_COUNT; i++) {
      var currentPinMarker = createRandomPin();

      fragment.appendChild(renderPinMarker(currentPinMarker, pinNumber));
      pinNumber++;
      pinMarkerArr.push(currentPinMarker);
    }

    pinMap.appendChild(fragment);
  };

  var renderLodgeView = function (num) {
    var lodgePanelElement = document.querySelector('#offer-dialog .dialog__panel');
    var lodgePanelAvatar = document.querySelector('#offer-dialog .dialog__title img');
    var lodgePanelItem = pinMarkerArr[num];

    lodgePanelElement.replaceWith(renderLodge(lodgePanelItem));
    lodgePanelElement = lodgePanelElement;
    lodgePanelAvatar.src = lodgePanelItem.author.avatar;

    document.addEventListener('keydown', onEscKeydown);
  };

  var setActivePin = function (item) {
    activePinElement = item;
    activePinElement.classList.add('pin--active');
  };

  var removeActivePin = function () {
    if (activePinElement) {
      activePinElement.classList.remove('pin--active');
    }
  };

  var getPinNumber = function (item) {
    return item.getAttribute('data-number');
  };

  var openLodge = function (event) {
    var target = event.target;

    if (!target.classList.contains('pin') && target.parentNode.classList.contains('pin')) {
      target = target.parentNode;
    }

    renderLodgeView(getPinNumber(target));
    removeActivePin();
    setActivePin(target);
    dialogElement.classList.remove('hidden');

    document.addEventListener('keydown', onEscKeydown);
  };

  var closeLodge = function () {
    event.preventDefault();
    dialogElement.classList.add('hidden');
    removeActivePin();

    document.removeEventListener('keydown', onEscKeydown);
  };

  var onEscKeydown = function (event) {
    if (event.keyCode === keyCode.ESC) {
      closeLodge();
    }
  };

  setPinMarker();
  renderLodgeView(0);

  pinMap.addEventListener('click', openLodge);

  pinMap.addEventListener('keydown', function (event) {
    if (event.keyCode === keyCode.ENTER) {
      openLodge(event);
    }
  });

  dialogElementClose.addEventListener('click', closeLodge);

  dialogElementClose.addEventListener('keydown', function (event) {
    if (event.keyCode === keyCode.ENTER) {
      closeLodge(event);
    }
  });
})();
