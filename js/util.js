'use strict';

(function () {
  var keyCode = {
    ESC: 27,
    ENTER: 13
  };

  var getRandomNumbers = function (count, maxCount) {
    var nums = [];

    if (count >= maxCount) {
      while (nums.length < maxCount) {
        var randomNumber = getRandomNumber(1, count);

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
    getRandomNumber: getRandomNumber,
    getRandomNumbers: getRandomNumbers
  };
})();
