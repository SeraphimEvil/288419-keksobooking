'use strict';

(function () {
  var SERVER_URL = 'https://1510.dump.academy/keksobooking';
  var errorMessageElement = document.querySelector('#error-template').content;

  var addLoadListener = function (element, onSuccess, onError) {
    element.addEventListener('load', function () {
      if (element.status === 200) {
        onSuccess(element.response);
      } else {
        onError('Ошибка! Код ответа: ' + element.status + ' ' + element.statusText);
      }
    });
  };

  var addErrorListener = function (element, onError) {
    element.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
  };

  var addTimeoutListener = function (element, onError) {
    element.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за: ' + element.timeout + 'мс');
    });
  };

  var createXhrRequest = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = 10000;

    addLoadListener(xhr, onSuccess, onError);
    addErrorListener(xhr, onError);
    addTimeoutListener(xhr, onError);

    return xhr;
  };

  var renderErrorMessage = function (errorMessage) {
    var errorElement = document.createDocumentFragment();
    var errorMessageContainer = errorMessageElement.cloneNode(true);
    var errorMessageContent = errorMessageContainer.querySelector('.error-message');

    errorMessageContent.textContent = errorMessage;

    errorElement.appendChild(errorMessageContainer);
    document.body.appendChild(errorElement);
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
    },
    error: renderErrorMessage
  };
})();
