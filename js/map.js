'use strict';

(function () {
  var AUTHOR_AVATARS = ['01', '02', '03', '04', '05', '06', '07', '08'];
  var OFFER_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var OFFER_TYPES = ['flat', 'house', 'bungalo'];
  var OFFER_TIMES = ['12:00', '13:00', '14:00'];
  var OFFER_FEAUTERES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  var stickerMap = document.querySelector('.tokyo__pin-map');
  var similarStickerElement = stickerMap.querySelector('.dialog__panel');
  var similarStickerTemplate = document.querySelector('#lodge-template').content;

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

  var removeElement = function (elementIndex, array) {
    return array.splice(elementIndex, 1);
  };

  var getSimilarSticker = function () {
    var similarSticker = {
      author: {
        avatar: 'img/avatars/user' + getArrayElement(AUTHOR_AVATARS) + '.png'
      },
      offer: {
        title: getArrayElement(OFFER_TITLES),
        address: '' + getRandomNumber(300, 900) + ', ' + getRandomNumber(100, 500) + '',
        price: getRandomNumber(1000, 1000000),
        type: getArrayElement(OFFER_TYPES),
        rooms: getRandomNumber(1, 5),
        guests: getRandomNumber(1, 10),
        checkin: getArrayElement(OFFER_TIMES),
        checkout: getArrayElement(OFFER_TIMES),
        features: getRandomItems(OFFER_FEAUTERES),
        description: '',
        photos: []
      },
      location: {
        x: getRandomNumber(300, 900),
        y: getRandomNumber(100, 500)
      }
    };
    return similarSticker;
  };

  var getFragment = function () {
    return document.createDocumentFragment();
  };

  var renderSticker = function (sticker) {
    var stickerElement = similarStickerTemplate.cloneNode(true);
    stickerElement.querySelector('.lodge__title').textContent = sticker.offer.title;

    return stickerElement;
  };

  for (var i = 0; i < 8; i++) {
    var fragment = getFragment();
    fragment.appendChild(renderSticker(getSimilarSticker()));
    similarStickerElement.appendChild(fragment);
  }
})();
