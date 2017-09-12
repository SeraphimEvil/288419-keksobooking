'use strict';

(function () {
  var errorMessageElement = document.querySelector('#error-template').content;

  window.errorMessage = function (errorMessage) {
    var errorFragment = document.createDocumentFragment();
    var errorElement = errorMessageElement.cloneNode(true);
    var errorMessageContent = errorElement.querySelector('.error-message');

    errorMessageContent.textContent = errorMessage;

    errorFragment.appendChild(errorElement);
    document.body.appendChild(errorFragment);
  };
})();
