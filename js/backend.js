'use strict';

(function () {
  var SERVER_URL = 'https://1510.dump.academy/keksobooking';

  var createXhrRequest = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = 10000;

    xhr.addEventListener('load', createXhrLoadHandler(xhr, onSuccess, onError));
    xhr.addEventListener('error', createXhrErrorHandler(onError));
    xhr.addEventListener('timeout', createXhrTimeoutHandler(xhr, onError));

    return xhr;
  };

  var createXhrLoadHandler = function (xhr, onSuccess, onError) {
    return function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Ошибка! Код ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    };
  };

  var createXhrErrorHandler = function (onError) {
    return function () {
      onError('Произошла ошибка соединения');
    };
  };

  var createXhrTimeoutHandler = function (xhr, onError) {
    return function () {
      onError('Запрос не успел выполниться за: ' + xhr.timeout + 'ms');
    };
  };

  window.backend = {
    load: function (onSuccess, onError) {
      var xhr = createXhrRequest(onSuccess, onError);

      xhr.open('GET', SERVER_URL + '/data');
      xhr.send();
    },
    save: function (data, onSuccess, onError) {
      var xhr = createXhrRequest(onSuccess, onError);

      xhr.open('POST', SERVER_URL);
      xhr.send(data);
    }
  };
})();
