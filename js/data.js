'use strict';

(function () {
  var inputStatus = {
    IS_ERROR: '1px solid crimson',
    IS_RIGHT: '1px solid #d9d9d3'
  };

  var pinLocationCorrection = {
    X: 28,
    Y: 75
  };

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

  var capacityCount = {
    ZERO: '0',
    ONE: '1',
    TWO: '2',
    THREE: '3'
  };

  var prices = {
    ZERO: 0,
    ONE_THOUSAND: 1000,
    FIVE_THOUSAND: 5000,
    TEN_THOUSAND: 10000
  };

  var authorAvatars = ['01', '02', '03', '04', '05', '06', '07', '08'];
  var offerTitles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var offerTypes = ['flat', 'house', 'bungalo'];
  var offerTimes = ['12:00', '13:00', '14:00'];
  var offerFeauteres = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var pinMarkerArr = [];
  var PINS_COUNT = authorAvatars.length;

  window.data = {
    authorAvatars: authorAvatars,
    offerTitles: offerTitles,
    offerTypes: offerTypes,
    offerTimes: offerTimes,
    offerFeauteres: offerFeauteres,
    pinMarkerArr: pinMarkerArr,
    PINS_COUNT: PINS_COUNT,
    prices: prices,
    capacityCount: capacityCount,
    roomsCount: roomsCount,
    housingType: housingType,
    pinLocationCorrection: pinLocationCorrection,
    inputStatus: inputStatus
  };
})();
