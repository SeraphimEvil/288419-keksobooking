'use strict';

(function () {
  var AUTHOR_AVATARS = ['01', '02', '03', '04', '05', '06', '07', '08'];
  var OFFER_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];

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


  var SIMILAR_STICKERS = [
    {
      author: {
        avatar: `img/avatars/user${getArrayElement(AUTHOR_AVATARS)}.png`
      },

      offer: {
        title: `${getArrayElement(OFFER_TITLES)}`
        // address: строка, адрес предложения, представляет собой запись вида "{{location.x}}, {{location.y}}"
        // price: число, случайная цена от 1000 до 1 000 000
        // type: строка с одним из трех фиксированных значений: flat, house или bungalo
        // rooms: число, случайное количество комнат от 1 до 5
        // guests: число, случайное количество гостей, которое можно разместить
        // checkin: строка с одним из трех фиксированных значений: 12:00, 13:00 или 14:00,
        // checkout: строка с одним из трех фиксированных значений: 12:00, 13:00 или 14:00
        // features: массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner",
        // description: пустая строка,
        // photos: пустой массив
      },

      location: {
        x: случайное число, координата x метки на карте в блоке .tokyo__pin-map от 300 до 900,
        y: случайное число, координата y метки на карте в блоке .tokyo__pin-map от 100 до 500
      }
    }
  ]

  console.log(SIMILAR_STICKERS)
})();
