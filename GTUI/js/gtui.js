(function ($) {
    var _gtui = {};

    var _parseObj = function (sourceStr) {
        var obj = {};
        sourceStr = sourceStr.replace(/^\s*{/, '').replace(/}\s*$/, '').split(',');

        for (var i = 0, length = sourceStr.length; i < length; i++) {
            var _temp = sourceStr[i].split(':'),
                _key = $.trim(_temp[0]).replace(/(^"\s*|^'\s*)/, '').replace(/(\s*"$|\s*'$)/, ''),
                _value = $.trim(_temp[1]).replace(/(^"\s*|^'\s*)/, '').replace(/(\s*"$|\s*'$)/, '');

            obj[_key] = _value
        }
        return obj;
    };

    $.extend(_gtui, {
        utils: {
            parseObj: _parseObj
        }
    });

    window.gtui = _gtui;
})(jQuery);

require('./table.js');
require('./verticaltile.js');