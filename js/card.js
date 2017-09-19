'use strict';

(function () {
  var pinModule = window.pin;
  var dataModule = window.data;

  var lodgeTemplateElement = document.querySelector('#lodge-template').content;
  var dialogElement = document.querySelector('#offer-dialog');
  var lodgePanelAvatar = dialogElement.querySelector('.dialog__title img');
  var dialogCloseElement = dialogElement.querySelector('.dialog__close');


  var closeDialog = function () {
    dialogElement.classList.add('hidden');
    pinModule.removeActivePin();
  };

  var getPinNumber = function (item) {
    return parseInt(item.getAttribute('data-number'), 10);
  };

  var openDialog = function () {
    var target = event.target;

    if (!target.classList.contains('pin') && target.parentNode.classList.contains('pin')) {
      target = target.parentNode;
    }

    if (target === pinModule.activePinElement || target === pinModule.pinMapMainElement) {
      return;
    }

    pinModule.setActivePin(target);
    renderLodgeView(getPinNumber(target));
    dialogElement.classList.remove('hidden');
  };

  var renderLodgeView = function (num) {
    var lodgePanelElement = dialogElement.querySelector('.dialog__panel');
    var lodgePanelItem = dataModule.pinMarkers[num];

    dialogElement.replaceChild(renderLodge(lodgePanelItem), lodgePanelElement);
    lodgePanelAvatar.src = lodgePanelItem.author.avatar;
  };

  var renderLodge = function (pin) {
    var lodgeElement = lodgeTemplateElement.cloneNode(true);
    var lodgeFeatures = lodgeElement.querySelector('.lodge__features');
    var lodgeTitle = pin.offer.title;
    var lodgeAddress = pin.offer.address;
    var lodgePrice = pin.offer.price + ' ₽/ночь';
    var lodgeType = getPinOfferTypeTranslate(pin.offer.type);
    var lodgeGuestsAndRooms = 'Для ' + pin.offer.guests + ' гостей в ' + pin.offer.rooms + ' комнатах';
    var lodgeCheckinCheckout = 'Заезд после ' + pin.offer.checkin + ', выезд до ' + pin.offer.checkout;
    var lodgeDescription = pin.offer.description;

    lodgeElement.querySelector('.lodge__title').textContent = lodgeTitle;
    lodgeElement.querySelector('.lodge__address').textContent = lodgeAddress;
    lodgeElement.querySelector('.lodge__price').textContent = lodgePrice;
    lodgeElement.querySelector('.lodge__type').textContent = lodgeType;
    lodgeElement.querySelector('.lodge__rooms-and-guests').textContent = lodgeGuestsAndRooms;
    lodgeElement.querySelector('.lodge__checkin-time').textContent = lodgeCheckinCheckout;
    renderFeatures(lodgeFeatures, pin.offer.features);
    lodgeElement.querySelector('.lodge__description').textContent = lodgeDescription;

    return lodgeElement;
  };

  var renderFeatures = function (placement, features) {
    features.forEach(function (element) {
      var featuresElement = document.createElement('span');

      featuresElement.classList.add('feature__image');
      featuresElement.classList.add('feature__image--' + element);
      placement.appendChild(featuresElement);
    });
  };

  var getPinOfferTypeTranslate = function (offerType) {
    var offerTypeValue = 'Не определено';

    switch (offerType) {
      case dataModule.housingType.FLAT:
        offerTypeValue = 'Квартира';
        break;
      case dataModule.housingType.HOUSE:
        offerTypeValue = 'Дом';
        break;
      case dataModule.housingType.BUNGALO:
        offerTypeValue = 'Бунгало';
    }

    return offerTypeValue;
  };

  closeDialog();

  window.card = {
    openDialog: openDialog,
    closeDialog: closeDialog,
    dialogCloseElement: dialogCloseElement
  };
})();
