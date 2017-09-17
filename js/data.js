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

  var AVAILABLE_GIESTS = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  var prices = {
    ZERO: 0,
    ONE_THOUSAND: 1000,
    FIVE_THOUSAND: 5000,
    TEN_THOUSAND: 10000
  };

  var filterPrices = {
    MIDDLE_START: 10000,
    HIGH_START: 50000
  };

  var filterPricesCategory = {
    LOW: 'low',
    MIDDLE: 'middle',
    HIGH: 'high'
  };

  var filterValues = {
    ANY: 'any',
    TYPE: 'type',
    ROOMS: 'rooms',
    GUESTS: 'guests'
  };

  var pinMarkers = [];

  window.data = {
    pinMarkers: pinMarkers,
    prices: prices,
    AVAILABLE_GIESTS: AVAILABLE_GIESTS,
    housingType: housingType,
    pinLocationCorrection: pinLocationCorrection,
    inputStatus: inputStatus,
    filterPrices: filterPrices,
    filterPricesCategory: filterPricesCategory,
    filterValues: filterValues
  };
})();
