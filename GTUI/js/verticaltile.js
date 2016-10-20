/**
 * Table
 */

(function ($) {

    $.widget("gtui.verticaltile", {
        options: {
            
        },
        _create: function () {
            this._updateHeight();

            this._initEvents();
        },
        _updateHeight: function (e) {
            var _self = this,
                _el = _self.element,
                _window = window;

            var _top = _el.position().top,
                _docHeight = document.documentElement.clientHeight,
                _offsetBottom = Math.max(document.body.clientHeight, $('html').outerHeight()) - _top - _el.height();

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
                    else if (e.data._docClientWidth !== document.documentElement.clientWidth) {
                        e.data._docClientWidth = document.documentElement.clientWidth;
                        e.data.element.trigger('resize', e);
                    }
                });
        },
        _destory: function e() {
            $(window).off('resize' + this.eventNamespace);
        }
    });
})(jQuery);