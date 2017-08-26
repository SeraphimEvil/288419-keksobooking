'use strict';

(function () {
  var authorAvatars = ['01', '02', '03', '04', '05', '06', '07', '08'];
  var offerTitles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var offerTypes = ['flat', 'house', 'bungalo'];
  var offerTimes = ['12:00', '13:00', '14:00'];
  var offerFeauteres = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  var PINS_COUNT = authorAvatars.length;
  var PIN_LOCATION_X_CORRECTION = 28;
  var PIN_LOCATION_Y_CORRECTION = 75;

  var pinTemplate = document.querySelector('#pin-template').content;
  var lodgeTemplate = document.querySelector('#lodge-template').content;
  var pinMap = document.querySelector('.tokyo__pin-map');
  var lodgePanelAvatar = document.querySelector('#offer-dialog .dialog__title img');
  var lodgePanelElement = document.querySelector('#offer-dialog .dialog__panel');
  var fragment = document.createDocumentFragment();
  var pinMarkerArr = [];

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
    var arrayElement = removeElement(arrayListPos, array);
    return arrayElement;
  };

  var getRandomArrayElement = function (array) {
    return array[getRandomArrayPos(array)];
  };

  var removeElement = function (elementIndex, array) {
    return array.splice(elementIndex, 1);
  };

  var getSimilarPin = function () {
    var locationX = getRandomNumber(300, 900);
    var locationY = getRandomNumber(100, 500);

    return {
      author: {
        avatar: 'img/avatars/user' + getArrayElement(authorAvatars) + '.png'
      },
      offer: {
        title: getArrayElement(offerTitles),
        address: '' + locationX + ', ' + locationY + '',
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
    if (offerType === 'flat') {
      offerType = 'Квартира';
    } else if (offerType === 'house') {
      offerType = 'Дом';
    } else {
      offerType = 'Бунгало';
    }

    return offerType;
  };

  var renderPinOfferFeauteres = function (features) {
    return features.map(function (item) {
      return '<span class="feature__image feature__image--' + item + '"></span>';
    }).join('');
  };

  var renderPinMarker = function (pin) {
    var pinMarker = pinTemplate.cloneNode(true);
    var pinMarkerLocationX = pin.location.x + PIN_LOCATION_X_CORRECTION;
    var pinMarkerLocationY = pin.location.y - PIN_LOCATION_Y_CORRECTION;
    var pinMarkerAvatar = pin.author.avatar;

    pinMarker.querySelector('.pin').style.left = pinMarkerLocationX + 'px';
    pinMarker.querySelector('.pin').style.top = pinMarkerLocationY + 'px';
    pinMarker.querySelector('img.rounded').src = pinMarkerAvatar;

    pinMarkerArr.push(pin);

    return pinMarker;
  };

  var renderLodge = function (pin) {
    var lodgeElement = lodgeTemplate.cloneNode(true);
    var lodgeTitle = pin.offer.title;
    var lodgeAddress = pin.offer.address;
    var lodgePrice = pin.offer.price;
    var lodgeType = getPinOfferTypeTranslate(pin.offer.type);
    var lodgeGuests = pin.offer.guests;
    var lodgeRooms = pin.offer.rooms;
    var lodgeCheckin = pin.offer.checkin;
    var lodgeCheckout = pin.offer.checkout;
    var lodgeFeatures = renderPinOfferFeauteres(pin.offer.features);
    var lodgeDescription = pin.offer.description;
    var lodgeAvatar = pin.author.avatar;

    lodgeElement.querySelector('.lodge__title').textContent = lodgeTitle;
    lodgeElement.querySelector('.lodge__address').textContent = lodgeAddress;
    lodgeElement.querySelector('.lodge__price').innerHTML = lodgePrice + '  &#x20bd;/ночь';
    lodgeElement.querySelector('.lodge__type').textContent = lodgeType;
    lodgeElement.querySelector('.lodge__rooms-and-guests').textContent =
          'Для ' + lodgeGuests + ' гостей в ' + lodgeRooms + ' комнатах';
    lodgeElement.querySelector('.lodge__checkin-time').textContent =
          'Заезд после ' + lodgeCheckin + ', выезд до ' + lodgeCheckout + '';
    lodgeElement.querySelector('.lodge__features').innerHTML = lodgeFeatures;
    lodgeElement.querySelector('.lodge__description').textContent = lodgeDescription;

    lodgePanelAvatar.src = lodgeAvatar;

    return lodgeElement;
  };

  for (var i = 0; i < PINS_COUNT; i++) {
    fragment.appendChild(renderPinMarker(getSimilarPin()));
    pinMap.appendChild(fragment);
  }

  lodgePanelElement.replaceWith(renderLodge(pinMarkerArr[0]));
})();
