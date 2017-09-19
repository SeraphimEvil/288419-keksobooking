'use strict';

(function () {
  var keyCode = {
    ESC: 27,
    ENTER: 13
  };

  var getRandomNumbers = function (maxCount, count) {
    var nums = [];

    if (maxCount >= count) {
      while (nums.length < count) {
        var randomNumber = getRandomNumber(1, maxCount);

        if (nums.indexOf(randomNumber) === -1) {
          nums.push(randomNumber);
        }
      }
    }

    return nums;
  };

  var getRandomNumber = function (min, max) {
    return Math.floor(min + Math.random() * (max - min));
  };

  window.util = {
    isEscEvent: function (event, action) {
      if (event.keyCode === keyCode.ESC) {
        action();
      }
    },
    isEnterEvent: function (event, action) {
      if (event.keyCode === keyCode.ENTER) {
        action();
      }
    },
    getRandomNumbers: getRandomNumbers
  };
})();
