'use strict';

(function () {
  var SERVER_URL = 'https://1510.dump.academy/keksobooking';
  var errorMessageElement = document.querySelector('#error-template').content;

  var addLoadListener = function (element, success, error) {
    element.addEventListener('load', function () {
      if (element.status === 200) {
        success(element.response);
      } else {
        error('Ошибка! Код ответа: ' + element.status + ' ' + element.statusText);
      }
    });
  };

  var addErrorListener = function (element, error) {
    element.addEventListener('error', function () {
      error('Произошла ошибка соединения');
    });
  };

  var addTimeoutListener = function (element, error) {
    element.addEventListener('timeout', function () {
      error('Запрос не успел выполниться за: ' + element.timeout + 'ms');
    });
  };

  var createXhrRequest = function (success, error) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = 10000;

    addLoadListener(xhr, success, error);
    addErrorListener(xhr, error);
    addTimeoutListener(xhr, error);

    return xhr;
  };

  var renderErrorMessage = function (errorMessage) {
    var errorFragment = document.createDocumentFragment();
    var errorElement = errorMessageElement.cloneNode(true);
    var errorMessageContent = errorElement.querySelector('.error-message');

    errorMessageContent.textContent = errorMessage;

    errorFragment.appendChild(errorElement);
    document.body.appendChild(errorFragment);
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
    },
    error: renderErrorMessage
  };
})();
