'use strict';

(function () {
  var SERVER_URL = 'https://1510.dump.academy/keksobooking';

  var createXhrRequest = function (success, error) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = 10000;

    xhr.addEventListener('load', xhrLoadHandler(success, error));
    xhr.addEventListener('error', xhrErrorHandler(error));
    xhr.addEventListener('timeout', xhrTimeoutHandler(error));

    return xhr;
  };

  var xhrLoadHandler = function (success, error) {
    return function (event) {
      if (event.target.status === 200) {
        success(event.target.response);
      } else {
        error('Ошибка! Код ответа: ' + event.target.status + ' ' + event.target.statusText);
      }
    };
  };

  var xhrErrorHandler = function (error) {
    return function () {
      error('Произошла ошибка соединения');
    };
  };

  var xhrTimeoutHandler = function (error) {
    return function (event) {
      error('Запрос не успел выполниться за: ' + event.target.timeout + 'ms');
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
