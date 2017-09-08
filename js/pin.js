'use strict';

(function () {
  var pinTemplateElement = document.querySelector('#pin-template').content;
  var pinMapElement = document.querySelector('.tokyo__pin-map');
  var pinMapMainElement = pinMapElement.querySelector('.pin.pin__main');
  var activePinElement;

  var createRandomPin = function () {
    var locationX = getRandomNumber(300, 900);
    var locationY = getRandomNumber(100, 500);

    return {
      author: {
        avatar: 'img/avatars/user' + getArrayElement(window.data.authorAvatars) + '.png'
      },
      offer: {
        title: getArrayElement(window.data.offerTitles),
        address: locationX + ', ' + locationY,
        price: getRandomNumber(1000, 1000000),
        type: getRandomArrayElement(window.data.offerTypes),
        rooms: getRandomNumber(1, 5),
        guests: getRandomNumber(1, 10),
        checkin: getRandomArrayElement(window.data.offerTimes),
        checkout: getRandomArrayElement(window.data.offerTimes),
        features: getRandomItems(window.data.offerFeauteres),
        description: '',
        photos: []
      },
      location: {
        x: locationX,
        y: locationY
      }
    };
  };

  var getRandomNumber = function (min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  };

  var getArrayElement = function (array) {
    var arrayListPos = getRandomArrayPos(array);
    var arrayElement = array.splice(arrayListPos, 1);
    return arrayElement;
  };

  var getRandomArrayElement = function (array) {
    return array[getRandomArrayPos(array)];
  };

  var getRandomItems = function (array) {
    var randomItemsCount = getRandomNumber(1, array.length);
    var randomItems = [];

    for (var j = 0; j < randomItemsCount; j++) {
      randomItems.push(getArrayElement(array));
    }

    return randomItems;
  };

  var getRandomArrayPos = function (array) {
    return Math.floor(Math.random() * array.length);
  };

  var renderPinMarkers = function () {
    var fragmentElement = document.createDocumentFragment();

    for (var i = 0; i < window.data.PINS_COUNT; i++) {
      var currentPinMarker = createRandomPin();

      fragmentElement.appendChild(createPinMarker(currentPinMarker, i));
      window.data.pinMarkerArr.push(currentPinMarker);
    }

    pinMapElement.appendChild(fragmentElement);
  };

  var createPinMarker = function (pin, pinNumber) {
    var pinMarker = pinTemplateElement.cloneNode(true);
    var pinMarkerLocationX = pin.location.x + window.data.pinLocationCorrection.X;
    var pinMarkerLocationY = pin.location.y - window.data.pinLocationCorrection.Y;
    var pinMarkerItem = pinMarker.querySelector('.pin');

    pinMarkerItem.style.left = pinMarkerLocationX + 'px';
    pinMarkerItem.style.top = pinMarkerLocationY + 'px';
    pinMarker.querySelector('img.rounded').src = pin.author.avatar;
    pinMarkerItem.tabIndex = 0;
    pinMarkerItem.dataset.number = pinNumber;

    return pinMarker;
  };

  var pinMapClickHandler = function (event) {
    window.card.openDialog(event);
  };

  var pinMapKeydownHandler = function (event) {
    window.util.isEnterEvent(event, window.card.openDialog);
  };

  var setActivePin = function (item) {
    removeActivePin(item);
    activePinElement = item;
    activePinElement.classList.add('pin--active');
  };

  var removeActivePin = function () {
    if (activePinElement) {
      activePinElement.classList.remove('pin--active');
    }
  };

  renderPinMarkers();

  pinMapElement.addEventListener('click', pinMapClickHandler);
  pinMapElement.addEventListener('keydown', pinMapKeydownHandler);

  window.pin = {
    activePinElement: activePinElement,
    pinMapMainElement: pinMapMainElement,
    setActivePin: setActivePin,
    removeActivePin: removeActivePin
  };
})();
