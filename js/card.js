'use strict';

(function () {
  var lodgeTemplateElement = document.querySelector('#lodge-template').content;
  var dialogElement = document.querySelector('#offer-dialog');
  var lodgePanelAvatar = dialogElement.querySelector('.dialog__title img');
  var dialogCloseElement = dialogElement.querySelector('.dialog__close');

  var closeDialog = function () {
    dialogElement.classList.add('hidden');
    window.pin.removeActivePin();
  };

  var getPinNumber = function (item) {
    return parseInt(item.getAttribute('data-number'), 10);
  };

  var openDialog = function () {
    var target = event.target;

    if (!target.classList.contains('pin') && target.parentNode.classList.contains('pin')) {
      target = target.parentNode;
    }

    if (target === window.pin.activePinElement || target === window.pin.pinMapMainElement) {
      return;
    }

    window.pin.setActivePin(target);
    renderLodgeView(getPinNumber(target));
    dialogElement.classList.remove('hidden');
  };

  var renderLodgeView = function (num) {
    var lodgePanelElement = dialogElement.querySelector('.dialog__panel');
    var lodgePanelItem = window.data.pinMarkerArr[num];

    dialogElement.replaceChild(renderLodge(lodgePanelItem), lodgePanelElement);
    lodgePanelAvatar.src = lodgePanelItem.author.avatar;
  };

  var renderLodge = function (pin) {
    var lodgeElement = lodgeTemplateElement.cloneNode(true);
    var lodgeTitle = pin.offer.title;
    var lodgeAddress = pin.offer.address;
    var lodgePrice = pin.offer.price + '  &#x20bd;/ночь';
    var lodgeType = getPinOfferTypeTranslate(pin.offer.type);
    var lodgeGuestsAndRooms = 'Для ' + pin.offer.guests + ' гостей в ' + pin.offer.rooms + ' комнатах';
    var lodgeCheckinCheckout = 'Заезд после ' + pin.offer.checkin + ', выезд до ' + pin.offer.checkout;
    var lodgeFeatures = renderPinOfferFeauteres(pin.offer.features);
    var lodgeDescription = pin.offer.description;

    lodgeElement.querySelector('.lodge__title').textContent = lodgeTitle;
    lodgeElement.querySelector('.lodge__address').textContent = lodgeAddress;
    lodgeElement.querySelector('.lodge__price').innerHTML = lodgePrice;
    lodgeElement.querySelector('.lodge__type').textContent = lodgeType;
    lodgeElement.querySelector('.lodge__rooms-and-guests').textContent = lodgeGuestsAndRooms;
    lodgeElement.querySelector('.lodge__checkin-time').textContent = lodgeCheckinCheckout;
    lodgeElement.querySelector('.lodge__features').innerHTML = lodgeFeatures;
    lodgeElement.querySelector('.lodge__description').textContent = lodgeDescription;

    return lodgeElement;
  };

  var getPinOfferTypeTranslate = function (offerType) {
    var offerTypeValue = 'Не определено';

    switch (offerType) {
      case window.data.housingType.FLAT:
        offerTypeValue = 'Квартира';
        break;
      case window.data.housingType.HOUSE:
        offerTypeValue = 'Дом';
        break;
      case window.data.housingType.BUNGALO:
        offerTypeValue = 'Бунгало';
    }

    return offerTypeValue;
  };

  var renderPinOfferFeauteres = function (features) {
    return features.map(function (item) {
      return '<span class="feature__image feature__image--' + item + '"></span>';
    }).join('');
  };

  closeDialog();

  window.card = {
    openDialog: openDialog,
    closeDialog: closeDialog,
    dialogCloseElement: dialogCloseElement
  };
})();
