'use strict';

(function () {
  var authorAvatars = ['01', '02', '03', '04', '05', '06', '07', '08'];
  var offerTitles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var offerTypes = ['flat', 'house', 'bungalo'];
  var offerTimes = ['12:00', '13:00', '14:00'];
  var offerFeauteres = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  var PINS_COUNT = authorAvatars.length;
  // карта токио
  var pinMap = document.querySelector('.tokyo__pin-map');

  var similarPinElement = pinMap.querySelector('.dialog__panel');

  //шаблон диалога
  var similarPinTemplate = document.querySelector('#lodge-template').content;



  var fragment = document.createDocumentFragment();

  // console.log(similarPinTemplate)
  console.log(similarPinElement)

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
    // return features.reduce(function (sum, current) {
    //   current = '<span class="feature__image feature__image--' + current + '"></span>';
    //   return sum + current;
    // }, '');
    var arrMap = features.map(function (item) {
      return '<span class="feature__image feature__image--' + item + '"></span>';
    });
    return arrMap.join('');
  };

  // var renderPinMarker = function (pin) {
  //   // var pinMarker = fragment.cloneNode(true);

  //   // fragment.appendChild(pin.location.x)
  // };

  var renderPin = function (pin) {
    var pinElement = similarPinTemplate.cloneNode(true);

    pinElement.querySelector('.lodge__title').textContent = pin.offer.title;
    pinElement.querySelector('.lodge__address').textContent = pin.offer.address;
    pinElement.querySelector('.lodge__price').textContent = '' + pin.offer.price +'&#x20bd;/ночь';
    pinElement.querySelector('.lodge__type').textContent = getPinOfferTypeTranslate(pin.offer.type);
    pinElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + pin.offer.guests + ' гостей в ' + pin.offer.rooms + ' комнатах';
    pinElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + pin.offer.checkin + ', выезд до ' + pin.offer.checkout + '';
    pinElement.querySelector('.lodge__features').innerHTML = renderPinOfferFeauteres(pin.offer.features);
    pinElement.querySelector('.lodge__description').innerHTML = pin.offer.description;

    return pinElement;
  };

  // for (var i = 0; i < PINS_COUNT; i++) {
  //   fragment.appendChild(renderPinMarker(getSimilarPin()));
  // }

  for (var i = 0; i < PINS_COUNT; i++) {
    fragment.appendChild(renderPin(getSimilarPin()));

    similarPinElement.appendChild(fragment);
  }

  console.log(fragment)
})();
