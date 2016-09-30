(function ($) {
    var _gtui = {};

    var getClosestEementByNodeName = function (element, nodeName) {
        if (!(element instanceof jQuery)) {
            element = $(element);
        }

        if (element[0].nodeName === nodeName.toUpperCase()) {
            return element;
        }
        else {
            return element.closest(nodeName);
        }
    };

    $.extend(_gtui, {
        utils: {
            getClosestEementByNodeName: getClosestEementByNodeName
        }
    });

    window.gtui = _gtui;
})(jQuery);