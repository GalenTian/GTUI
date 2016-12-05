(function ($) {
    var _gtui = {};

    var _getClosestEementByNodeName = function (element, nodeName) {
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
    var _browser = {};
    (function () {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.indexOf(' edge') > 0) {
            _browser.edge = ua.match(/edge\/([\d.]+)/)[1];
        }
        else if (ua.indexOf(' msie') > 0) {
            _browser.msie = ua.match(/msie ([\d.]+)/)[1];
        }
        else if (window.MSStream) { // IE 10+
            _browser.msie = ua.match(/rv\:([\d.]+)/)[1];
        }
        else if (ua.indexOf(' firefox') > 0) {
            _browser.firefox = ua.match(/firefox\/([\d.]+)/)[1];
        }
        else if (ua.indexOf(' opr') > 0) {
            _browser.opera = ua.match(/opr\/([\d.]+)/)[1];
        }
        else if (ua.indexOf(' chrome') > 0) {
            _browser.chrome = ua.match(/chrome\/([\d.]+)/)[1];
        }
        else if (ua.indexOf(' safari') > 0) {
            _browser.safari = ua.match(/version\/([\d.]+)/)[1];
        }
        else {
            _browser.unknown = 'unknown';
        }
    })();

    $.extend(_gtui, {
        utils: {
            getClosestEementByNodeName: _getClosestEementByNodeName,
            KeyCode: {
                BACKSPACE: 8,
                TAB: 9,

                ENTER: 13,

                ESC: 27,

                SPACE: 32,
                PAGE_UP: 33,
                PAGE_DOWN: 34,
                END: 35,
                HOME: 36,
                LEFT: 37,
                UP: 38,
                RIGHT: 39,
                DOWN: 40,

                DELETE: 46,

                NUM_0: 48,
                NUM_1: 49,
                NUM_2: 50,
                NUM_3: 51,
                NUM_4: 52,
                NUM_5: 53,
                NUM_6: 54,
                NUM_7: 55,
                NUM_8: 56,
                NUM_9: 57,

                KEY_A: 65,
                KEY_B: 66,
                KEY_C: 67,
                KEY_D: 68,
                KEY_E: 69,
                KEY_F: 70,
                KEY_G: 71,
                KEY_H: 72,
                KEY_I: 73,
                KEY_J: 74,
                KEY_K: 75,
                KEY_L: 76,
                KEY_M: 77,
                KEY_N: 78,
                KEY_O: 79,
                KEY_P: 80,
                KEY_Q: 81,
                KEY_R: 82,
                KEY_S: 83,
                KEY_T: 84,
                KEY_U: 85,
                KEY_V: 86,
                KEY_W: 87,
                KEY_X: 88,
                KEY_Y: 89,
                KEY_Z: 90,

                SMALL_KEY_BOARD_0: 96,
                SMALL_KEY_BOARD_1: 97,
                SMALL_KEY_BOARD_2: 98,
                SMALL_KEY_BOARD_3: 99,
                SMALL_KEY_BOARD_4: 100,
                SMALL_KEY_BOARD_5: 101,
                SMALL_KEY_BOARD_6: 102,
                SMALL_KEY_BOARD_7: 103,
                SMALL_KEY_BOARD_8: 104,
                SMALL_KEY_BOARD_9: 105,
                SMALL_KEY_BOARD_MUL: 106,
                SMALL_KEY_BOARD_ADD: 107,

                SMALL_KEY_BOARD_SUB: 109,
                SMALL_KEY_BOARD_DOT: 110,
                SMALL_KEY_BOARD_DEV: 111,

                SEMICOLON: 186,
                KEY_ADD: 187,
                COMMA: 188,
                KEY_SUB: 189,
                DOT: 190,
                BEVEL: 191,
                KEY_DRIP: 192,

                LEFT_BRACKETS: 219,
                TURN_BEVEL: 220,
                RIGHT_BRACKETS: 221,
                UP_COMMA: 222
            },
            Browser: _browser
        }
    });

    window.gtui = _gtui;
})(jQuery);