'use strict';

(function () {
  var SERVER_URL = 'https://1510.dump.academy/keksobooking';

  var createXhrRequest = function (success, error) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = 10000;

    xhr.addEventListener('load', createXhrLoadHandler(xhr, success, error));
    xhr.addEventListener('error', createXhrErrorHandler(error));
    xhr.addEventListener('timeout', createXhrTimeoutHandler(xhr, error));

    return xhr;
  };

  var createXhrLoadHandler = function (xhr, success, error) {
    return function () {
      if (xhr.status === 200) {
        success(xhr.response);
      } else {
        error('Ошибка! Код ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    };
  };

  var createXhrErrorHandler = function (error) {
    return function () {
      error('Произошла ошибка соединения');
    };
  };

  var createXhrTimeoutHandler = function (xhr, error) {
    return function () {
      error('Запрос не успел выполниться за: ' + xhr.timeout + 'ms');
    };
  };

  window.backend = {
    load: function (success, error) {
      var xhr = createXhrRequest(success, error);

      xhr.open('GET', SERVER_URL + '/data');
      xhr.send();
    },
    save: function (data, success, error) {
      var xhr = createXhrRequest(success, error);

      xhr.open('POST', SERVER_URL);
      xhr.send(data);
    }
  };
})();
