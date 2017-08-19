'use strict';

(function () {
  var AUTHOR_AVATARS = ['01', '02', '03', '04', '05', '06', '07', '08'];
  var OFFER_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var OFFER_TYPES = ['flat', 'house', 'bungalo'];
  var OFFER_TIMES = ['12:00', '13:00', '14:00'];

  var getArrayPos = function (array) {
    var arrayPos = Math.floor(Math.random() * array.length);
    return arrayPos;
  };

  var removeElement = function (element, array) {
    array.splice(element, 1);
  };

  var getArrayElement = function (array) {
    var arrayListPos = getArrayPos(array);
    var arrayElement = array[arrayListPos];
    removeElement(arrayListPos, array);
    return arrayElement;
  };

  var getRandomNumber = function (min, max) {
    var randomNumber = min + Math.random() * (max + 1 - min);
    randomNumber = Math.floor(randomNumber);
    return randomNumber;
  };


  var similarStickers = [
    {
      author: {
        avatar: 'img/avatars/user' + getArrayElement(AUTHOR_AVATARS) + '.png'
      },

      offer: {
        title: getArrayElement(OFFER_TITLES),
        // address: '' + location:x + ', ' + location.y + '' /*строка, адрес предложения, представляет собой запись вида "{{location.x}}, {{location.y}}"*/
        // address:  offer['title'],
        price: getRandomNumber(1000, 1000000),
        type: getArrayElement(OFFER_TYPES),
        rooms: getRandomNumber(1, 5),
        guests: getRandomNumber(1, 10),
        checkin: getArrayElement(OFFER_TIMES),
        checkout: getArrayElement(OFFER_TIMES),
        // features: массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner",
        description: '',
        photos: []
      },

      location: {
        x: getRandomNumber(300, 900),
        y: getRandomNumber(100, 500)
      }
    }
  ];


  similarStickers
      .forEach(function (sticker) {
        console.log(sticker)
      });
})();
