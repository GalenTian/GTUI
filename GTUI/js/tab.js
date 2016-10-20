(function ($) {
    "use strict";

    $.widget("gtui.tab", $.gtui.tabbase, {
        options: {
            tabcontrolClass: 'tabs',
            
            selectedIndex: 0,

            selectedIndexChanged: $.noop
        },
        resetElement: function () {
            this._dealWithLi();
        },

        _create: function () {
            $(this.element.children('ul').find('li')[this.options.selectedIndex]).addClass('active');

            this._super();

            this._initElement();
            this._initUl();
            this._initLi();

            this._selectItem(this._li[this.options.selectedIndex]);
        },
        _initElement: function () {
            this.element.addClass(this.options.tabcontrolClass);
        },
        _initUl: function () {
            if (this._ul && this._ul.length > 0) {
                this._ul.attr('role', 'tablist').on('click', 'a', function (e) {
                    var $link = $(e.target);
                    // Prevent link routing the url
                    if ($link.closest('a') && $link.closest('a').attr('href')
                        && $link.closest('a').attr('href').indexOf('#') === 0) {
                        e.preventDefault();
                    }
                });
            }
        },
        _initLi: function () {
            var _self = this;
            if (_self._li && _self._li.length > 0) {
                _self._li.each(function (index, el) {
                    var _selected = false,
                        _$el = $(el);
                    if (index === _self.options.selectedIndex) {
                        _selected = true;
                        _$el.addClass('select');
                    }

                    _$el.attr({
                        'role': 'tab',
                        'tabindex': _selected  ? 0 : -1,
                        'aria-selected': _selected
                    });
                });
            }
        },
        _getSelectedIndexByItem: function (li) {
            return this._li.index(li);
        },
        _selectedItemChanged: function (oldItem, newItem) {
            this.option('selectedIndex', this._getSelectedIndexByItem(newItem));
        },
        _setExtendOption: function (key, value) {
            var _doIt = this._super(key, value);

            var _self = this;
            if (key === 'selectedIndex') {
                if (_self.options[key] !== value) {
                    return _doIt && true;
                }
                else return false;
            }

            return _doIt;
        },
        _optionChanged: function (key, param) {
            this._super(key, param);

            if (key === 'selectedIndex') {
                this._changeSelectedItem(this._li[param.newValue], this._li[param.oldValue]);
                this.element.trigger('selectedIndexChanged', param);
                this.options.selectedIndexChanged.apply(this.element, [{}, param]);
            }
        }
    });
}(jQuery));