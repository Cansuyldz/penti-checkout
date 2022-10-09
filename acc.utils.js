ACC.utils = {
    scroll: {
        animate: function (elemIdOrClass) {
            $('html,body').animate({
                scrollTop: elemIdOrClass
            }, 100);
        }
    },
    errorForInput: {
        addMessage: function (elemIdOrClass, message, type) {
            // type = scs/ err/ inf
            var element = $(elemIdOrClass);
            element.after('<div class="msg-' + type + '"> ' + message + '</div>')
        },
        removeMessage: function (elemIdOrClass) {
            var element = $(elemIdOrClass);
            element.find('[class*=msg-]').remove();
        }
    },
    globalMessage: {
        addMessage: function (elemIdOrClass, message, type, removeOtherMessage) {
            if (removeOtherMessage) {
                this.removeMessage();
            }
            // type: err/ success /info
            var element = $(elemIdOrClass);
            element.prepend('<div class="global global-' + type + '"><div style="line-height: 50px;padding-left: 15px">' + message + '</div></div>');
            setTimeout(function () {
                $('.global').remove();
            }, 3000)
        },
        removeMessage: function () {
            $('.global').remove();
        }
    }
}