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
  var similarPinElement = document.querySelector('.dialog__panel');
  var fragment = document.createDocumentFragment();


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
    if (offerType == 'flat') {
      offerType = 'Квартира';
    } else if (offerType == 'house') {
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

    pinMarker.querySelector('.pin').setAttribute('style', 'left: ' +
        (pin.location.x + PIN_LOCATION_X_CORRECTION) + 'px; top: ' +
        (pin.location.y - PIN_LOCATION_Y_CORRECTION) + 'px;');
    pinMarker.querySelector('img.rounded').setAttribute('src', '' + pin.author.avatar + '');

    return pinMarker;
  };

  var renderPin = function (pin) {
    var lodgeElement = lodgeTemplate.cloneNode(true);

    lodgeElement.querySelector('.lodge__title').textContent = pin.offer.title;
    lodgeElement.querySelector('.lodge__address').textContent = pin.offer.address;
    lodgeElement.querySelector('.lodge__price').textContent = '' + pin.offer.price +'&#x20bd;/ночь';
    lodgeElement.querySelector('.lodge__type').textContent = getPinOfferTypeTranslate(pin.offer.type);
    lodgeElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + pin.offer.guests + ' гостей в ' + pin.offer.rooms + ' комнатах';
    lodgeElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + pin.offer.checkin + ', выезд до ' + pin.offer.checkout + '';
    lodgeElement.querySelector('.lodge__features').innerHTML = renderPinOfferFeauteres(pin.offer.features);
    lodgeElement.querySelector('.lodge__description').innerHTML = pin.offer.description;

    return lodgeElement;
  };

  for (var i = 0; i < PINS_COUNT; i++) {
    // отображаю иконки
    fragment.appendChild(renderPinMarker(getSimilarPin()));
    pinMap.appendChild(fragment);



    // // как-то отображаю списки
    // fragment.appendChild(renderPin(getSimilarPin()));
    // similarPinElement.appendChild(fragment);
  }

  // for (var i = 0; i < PINS_COUNT; i++) {
  //   fragment.appendChild(renderPin(getSimilarPin()));
  //   console.log(fragment)
  //   similarPinElement.appendChild(fragment);
  // }
})();
