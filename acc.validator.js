ACC.validator = {
    isFunction: function (callback) {
        return typeof callback == 'function' ? true : false;
    }, isNullOrEmpty: function (value) {
        if ($.isNumeric(value)) {
            return false;
        }
        if (value !== null && typeof value === "object") {
            return false;
        }
        if (value === false || value === true) {
            return false;
        }
        if (value === null || value === undefined || value.trim() === "" || JSON.stringify(value).trim() === "") {
            return true;
        }
        return false;
    },
    emailValidator: function (input) {
        var isValid = (new RegExp(ACC.regex.email).test(input.val()));
        return isValid;
    },
    lettersValidator: function (input) {
        var isValid = (new RegExp(ACC.regex.letters).test(input.val()));
        return isValid;
    },
    namesValidator: function (input) {
        var isValid = (new RegExp(ACC.regex.names).test(input.val()));
        return isValid;
    },
    phoneValidator: function (input) {
        var isValid = (new RegExp(ACC.regex.phone).test(input.val()));
        return isValid;
    },
    phoneCustomValidator: function (input) {
        var isValid = (new RegExp(ACC.regex.phoneCustom).test(input.val()));
        return isValid;
    },
    cardNumberValidator: function (input) {
        var isValid = (new RegExp(ACC.regex.cardNumber).test(input.val()));
        return isValid;
    }
};