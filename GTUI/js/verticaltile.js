/**
 * Table
 */

(function ($) {

    $.widget("gtui.verticaltile", {
        options: {
            
        },
        _create: function () {
            this._getValues();
            this._updateHeight();

            this._initEvents();
        },
        _getValues: function () {
            var _self = this,
                _el = _self.element;

            var _top = _el.position().top,
                _outerHeight = _el.outerHeight();

            var _doc = document.documentElement,
                _docScrollHeight = _doc.scrollHeight;

            _self._elementTop = _top;
            _self._elementOffsetBottom = _docScrollHeight - _top - _outerHeight;
        },
        _updateHeight: function (e) {
            var _self = this,
                _el = _self.element,
                _window = window;

            var _top = _el.position().top,
                _docHeight = document.documentElement.clientHeight,
                _offsetBottom = _self._elementOffsetBottom;

            if (_top >= _docHeight - _offsetBottom) { }
            else {
                _el.outerHeight(_docHeight - _offsetBottom - _top);
                _self._docClientHeight = _docHeight;

                _el.trigger('resize', e);
            }
        },
        _initEvents: function () {
            $(window)
                .off('resize' + this.eventNamespace)
                .on('resize' + this.eventNamespace, this, function (e) {
                    if (e.data._docClientHeight !== document.documentElement.clientHeight)
                        e.data._updateHeight(e);
                });
        },
        _destory: function e() {
            $(window).off('resize' + this.eventNamespace);
        }
    });
})(jQuery);