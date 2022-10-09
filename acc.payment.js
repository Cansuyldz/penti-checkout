ACC.payment = {
    el: {
        delivery: '.delivery',
        paymentTypes: '.payment-types',
        agreement: '.agreement',
        card: '.card',
        payAtTheDoor: '.pay-at-the-door',
        siteHeader: '#site-header',
        summary: '.summary',
        agreement: '.agreement',
        paymentTypes: '.payment-types',
        informationAgreement: '.information-agreement',
        salesAgreement: '.sales-agreement',
        firstRadioDiv: '.pay-at-the-door-fast',
        secondRadioDiv: '.pay-at-the-door-slow',
        cardInput: '.credit-form',
        btnGroups: {
            deliveryCheckbox: '.delivery-checkbox',
            cardPaymentBtn: '#card-payment',
            payAtTheDoorBtn: '#pay-at-the-door-payment',
            submitBtn: '#submit-btn',
            firstRadio: '.first-radio',
            secondRadio: '.second-radio',
        }

    },
    init: function () {
        this.event.updateStandartDelivery();
        this.event.updatePaymentTypes();
        this.event.payAtTheDoorChecked()
        this.event.submitBtn();
        this.event.agreementControl();
        this.event.siteErrControl();
    },
    event: {
        updateStandartDelivery: function () {
            var _pay = ACC.payment;
            var delivery = _pay.el.delivery;
            var card = _pay.el.card;
            var cardBtn = _pay.el.btnGroups.cardPaymentBtn;
            var paymentTypes = _pay.el.paymentTypes;
            var agreement = _pay.el.agreement;
            var deliveryCheckbox = _pay.el.btnGroups.deliveryCheckbox;
            var checkbox = $(deliveryCheckbox).find('input[type=checkbox]')
            $(deliveryCheckbox).click(function () {
                if ($(checkbox).is(':checked')) {
                    $(card).addClass('active');
                    $(cardBtn).addClass('active');
                    $(paymentTypes).addClass('active');
                    $(agreement).addClass('active')
                    $(_pay.el.btnGroups.submitBtn).attr('disabled', false)
                } else {
                    $(card).removeClass('active');
                    $(cardBtn).removeClass('active');
                    $(paymentTypes).removeClass('active')
                    $(agreement).removeClass('active');
                    $(_pay.el.btnGroups.submitBtn).attr('disabled', true)
                }
            })
        },
        updatePaymentTypes: function () {
            var _pay = ACC.payment;
            var _utils = ACC.utils;
            var card = _pay.el.card;
            var payAtTheDoor = _pay.el.payAtTheDoor;
            var cardPaymentBtn = _pay.el.btnGroups.cardPaymentBtn;
            var payAtTheDoorBtn = _pay.el.btnGroups.payAtTheDoorBtn;
            $(payAtTheDoorBtn).click(function () {
                _utils.errorForInput.removeMessage($(card));
                $(payAtTheDoor).addClass('active');
                $(card).removeClass('active');
                $(payAtTheDoorBtn).addClass('active');
                $(cardPaymentBtn).removeClass('active')
            })
            $(cardPaymentBtn).click(function () {
                _utils.errorForInput.removeMessage($(payAtTheDoor));
                $(card).addClass('active');
                $(payAtTheDoor).removeClass('active');
                $(cardPaymentBtn).addClass('active');
                $(payAtTheDoorBtn).removeClass('active')
            })
        },
        payAtTheDoorChecked: function () {
            var _pay = ACC.payment;
            var _utils = ACC.utils;
            var payAtTheDoor = _pay.el.payAtTheDoor;
            var payAtTheDoorRadios = $(payAtTheDoor).find('input');
            var firstRadio = _pay.el.btnGroups.firstRadio;
            var firstRadioDiv = _pay.el.firstRadioDiv;
            var secondRadioDiv = _pay.el.secondRadioDiv;
            var secondRadio = _pay.el.btnGroups.secondRadio;
            var phoneDiv = '<div class="hidden-phone">Telefon Numarası <input type="text" class="phone"></div>'
            if ($(payAtTheDoorRadios).length > 0) {
                $(payAtTheDoorRadios).click(function () {
                    $(payAtTheDoor).find('.hidden-phone').remove();
                    if ($(firstRadio).is(':checked')) {
                        $(firstRadioDiv).append(phoneDiv);
                        $(secondRadioDiv).find('.hidden-phone').remove();
                    }
                    if ($(secondRadio).is(':checked')) {
                        $(secondRadioDiv).append(phoneDiv);
                        $(firstRadioDiv).find('.hidden-phone').remove();
                    }
                    var cleave = new Cleave('.phone', {
                        delimiters: ['(', ')', ' ', ' ', ' '],
                        prefix: '0',
                        noImmediatePrefix: true,
                        blocks: [1, 3, 3, 2, 2],
                        numericOnly: true,
                        delimiterLazyShow: true
                    })
                })
            }
        },
        submitBtn: function () {
            var _pay = ACC.payment;
            var _utils = ACC.utils;
            var card = _pay.el.card;
            var payAtTheDoor = _pay.el.payAtTheDoor;
            var cardInputs = $(card).find('input[type=text]');
            var payAtTheDoorRadios = $(payAtTheDoor).find('input[type=radio]');
            var submitBtn = _pay.el.btnGroups.submitBtn;
            $(submitBtn).click(function () {
                if ($(card).hasClass('active')) {
                    console.log('c');
                    _utils.errorForInput.removeMessage($(card));
                    cardInputs = Array.prototype.slice.call(cardInputs);
                    cardInputs.forEach(function (input) {
                        var input = $(input);
                        if (!input.val()) {
                            _utils.errorForInput.addMessage(input, 'zorunlu', 'err');
                            _utils.scroll.animate($(card).offset().top - 130)
                        }
                    })
                } else if ($(payAtTheDoor).hasClass('active')) {
                    console.log('f');
                    _utils.errorForInput.removeMessage($(payAtTheDoor))
                    if (!$(payAtTheDoorRadios).is(':checked')) {
                        payAtTheDoorRadios = Array.prototype.slice.call(payAtTheDoorRadios);
                        payAtTheDoorRadios.forEach(function (input) {
                            var input = $(input);
                            if (!input.is(':checked')) {
                                _utils.errorForInput.addMessage(input, 'seçiniz', 'err');
                                _utils.scroll.animate($(payAtTheDoor).offset().top - 130)
                            }
                        })
                    } else {
                        var phone = $('.phone');
                        if (!ACC.validator.phoneCustomValidator(phone)) {
                            _utils.errorForInput.addMessage(phone, 'hatalı format', 'err')
                        }
                    }
                }
            })
        },
        agreementControl: function () {
            var _pay = ACC.payment;
            var _utils = ACC.utils;
            var siteHeader = _pay.el.siteHeader;
            var summary = _pay.el.summary;
            var agreement = _pay.el.agreement;
            var card = _pay.el.card;
            var payAtTheDoor = _pay.el.payAtTheDoor;
            var sumbitBtn = _pay.el.btnGroups.submitBtn;
            var informationAgreement = _pay.el.informationAgreement;
            var salesAgreement = _pay.el.salesAgreement;
            $(sumbitBtn).click(function () {
                _utils.errorForInput.removeMessage($(summary));
                if ($(siteHeader).find('.msg-err').length === 0) {
                    if ($(payAtTheDoor).find('.msg-err').length === 0) {
                        if (!$(informationAgreement).is(':checked')) {
                            _utils.errorForInput.addMessage(informationAgreement, 'seçiniz', 'err');
                            _utils.scroll.animate($(agreement).offset().top - 100)
                        }
                        if (!$(salesAgreement).is(':checked')) {
                            _utils.errorForInput.addMessage(salesAgreement, 'seçiniz', 'err');
                            _utils.scroll.animate($(agreement).offset().top - 100)
                        }
                    }
                }
            })
        },
        siteErrControl: function () {
            var _pay = ACC.payment;
            var siteHeader = _pay.el.siteHeader;
            var _utils = ACC.utils;
            var submitBtn = _pay.el.btnGroups.submitBtn;
            $(submitBtn).click(function () {
                if ($(siteHeader).find('.msg-err').length === 0) {
                    _utils.globalMessage.addMessage($('body'), 'Ödeme İşlemi Başarıyla Gerçekleşti', 'scs', true)
                    _utils.scroll.animate($(siteHeader).offset().top - 0)
                }
            })
        }
    }
}
$(document).ready(function () {
    with (ACC.payment) {
        init();
    }
})
