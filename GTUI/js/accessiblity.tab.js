(function ($) {

    $.widget("gtui.tabbase", {
        options: {

        },
        selectPrev: function () {
            var prev = this._getPrevLi(this._currentSelectedItem);
            this._changeSelectedItem(prev);
        },
        selectNext: function () {
            var next = this._getNextLi(this._currentSelectedItem);
            this._changeSelectedItem(next);
        },
        selectFirst: function () {
            this._changeSelectedItem(this._firstLi[0]);
        },
        selectLast: function () {
            this._changeSelectedItem(this._lastLi[0]);
        },

        _create: function () {
            this._dealWithUl();
            this._dealWithLi();
            this._dealWithContent();
        },
        _setOption: function (key, value) {
            var _oldValue = this.options[key],
                _doIt = this._setExtendOption.apply(this, arguments);

            if (_doIt) {
                $.Widget.prototype._setOption.apply(this, arguments);
                this._optionChanged(key, { element: this.element, newValue: value, oldValue: _oldValue });
            }
        },
        _dealWithContent: function () {
            this.element.off('keydown' + this.eventNamespace)
                .on('keydown' + this.eventNamespace, 'div[role="tabpanel"]', this, function (e) {
                    switch (e.keyCode) {
                        case gtui.utils.KeyCode.UP:
                        case gtui.utils.KeyCode.LEFT:
                            if (e.ctrlKey) {
                                e.preventDefault();

                                e.data._currentSelectedItem.focus();
                            }
                            break;
                        case gtui.utils.KeyCode.PAGE_UP:
                            if (e.ctrlKey) {
                                e.preventDefault();

                                e.data.selectPrev();
                            }
                            break;
                        case gtui.utils.KeyCode.PAGE_DOWN:
                            if (e.ctrlKey) {
                                e.preventDefault();

                                e.data.selectNext();
                            }
                            break;
                    }
                });
        },
        _dealWithLi: function () {
            this._li = this._ul.find('li[aria-controls]');

            this._currentSelectedItem = this._li.filter('.select:not([aria-controls^="javascript:"])');
            if (this._currentSelectedItem.length > 1) this._currentSelectedItem = $(this._currentSelectedItem[this._currentSelectedItem.length - 1]);
            this._currentSelectedContent = $('#' + this._currentSelectedItem.attr('aria-controls')).attr('aria-hidden', 'false');
            this._firstLi = this._li.filter(':first');
            this._lastLi = this._li.filter(':last');
        },
        _dealWithUl: function () {
            var _self = this,
                _$el = _self.element,
                _$ul = _self._ul = _$el.children('ul');

            _$ul.off('click' + _self.eventNamespace)
                .on('click' + _self.eventNamespace, 'li:not(li:has(ul>li))', _self, function (e) {
                    if ($(this).attr('aria-selected') === 'true') return;

                    var _tb = e.data;

                    _tb._changeSelectedItem(this);
                })
                .off('keydown' + _self.eventNamespace)
                .on('keydown' + _self.eventNamespace, 'li:not(li:has(ul))', _self, function (e) {
                    switch (e.keyCode) {
                        case gtui.utils.KeyCode.UP:
                        case gtui.utils.KeyCode.LEFT:
                            e.preventDefault();

                            e.data.selectPrev();
                            break;
                        case gtui.utils.KeyCode.DOWN:
                        case gtui.utils.KeyCode.RIGHT:
                            e.preventDefault();

                            e.data.selectNext();
                            break;
                        case gtui.utils.KeyCode.HOME:
                            e.preventDefault();

                            e.data.selectFirst();
                            break;
                        case gtui.utils.KeyCode.END:
                            e.preventDefault();

                            e.data.selectLast();
                            break;
                    }
                });
        },
        _changeSelectedItem: function (el, old, autoChange) {
            if (this._currentSelectedItem[0] === el) return;

            var _oldItem = old ? old : this._currentSelectedItem,
                _passChange = this._selectedItemChanging(_oldItem, el);

            if (!_passChange) return;

            this._unselectItem(_oldItem);
            this._selectItem(el);

            if (!autoChange) {
                this._currentSelectedItem.focus();
            }

            this._selectedItemChanged(_oldItem, el);
        },
        _selectItem: function (el) {
            var _$el = (this._currentSelectedItem = $(el).addClass('select')
                .attr({
                    'aria-selected': 'true',
                    'tabindex': 0
                }));

            _$el.parent().closest('li').addClass('select')
                .attr({
                    'aria-selected': 'true',
                    'tabindex': 0
                });

            this._currentSelectedContent = $('#' + _$el.attr('aria-controls')).show().attr('aria-hidden', 'false');//控制显隐添加属性
        },
        _unselectItem: function (el) {
            if (!el || el.length === 0) return;

            var _$el = $(el).removeClass('select').attr({
                'aria-selected': 'false',
                'tabindex': -1
            });
            _$el.parent().closest('li').removeClass('select').attr({
                'aria-selected': 'false',
                'tabindex': -1
            });

            $('#' + _$el.attr('aria-controls')).hide().attr('aria-hidden', 'true');
        },
        _getPrevLi: function (li) {
            var index = this._li.index(li),
                prev = this._li[index - 1];
            if (!prev) {
                prev = this._lastLi[0];
            }
            return prev.getAttribute('aria-controls') ? prev : this._getPrevLi(prev);
        },
        _getNextLi: function (li) {
            var index = this._li.index(li),
                next = this._li[index + 1];

            if (!next) {
                next = this._firstLi[0];
            }
            return next.getAttribute('aria-controls') ? next : this._getNextLi(next);

        },
        _selectedItemChanging: function (oldItem, newItem) {
            return true;
        },
        _selectedItemChanged: function (oldItem, newItem) {

        },
        _setExtendOption: function (key, value) {
            return true;
        },
        _optionChanged: function (key, data) {

        }
    });
}(jQuery));