/**
 * Table
 */

(function ($) {

    $.extend(gtui, {
        table: {
            constant: {
                TABLE_CONTAINER_CLASS: 'table-container',

                TABLE_CLASS: 'table',
                TABLE_BORDERED_CLASS: 'table-bordered',
                TABLE_CELL_HORIZONTAL_BORDERED_CLASS: 'table-cell-horizontal-bordered',
                TABLE_CELL_VERTICAL_BORDERED_CLASS: 'table-cell-vertical-bordered',

                TABLE_STRIPED: 'table-striped',
                TABLE_STRIPED_ODD: 'table-striped-odd',
                TABLE_STRIPED_EVEN: 'table-striped-even',

                ORIGIN_TABLE_CONTAINER_CLASS: 'table-content',
                FROZEN_HEADER_TABLE_CONTAINER_CLASS: 'table-frozen-header',
                FROZEN_COLUMNS_TABLE_CONTAINER_CLASS: 'table-frozen-columns',
                FROZEN_COLUMNS_TABLE_HEADER_CONTAINER_CLASS: 'table-frozen-columns-header',

                columnType: {
                    TEXT: 0,
                    CHECKBOX: 100,
                    LINK: 200,
                    BUTTON_GROUP: 300
                }
            }
        }
    });

    $.widget("gtui.table", {
        options: {
            fillSpanClass: 'fill-span',

            frozenColumnsCount: 0
        },

        _create: function () {
            var _self = this,
                _el = _self.element;

            _self._getContainers();

            _self._getTables();

            _self.updateLayout();

            _self._initEvents();
        },
        _getContainers: function () {
            var _self = this,
                _el = _self.element,
                _constants = gtui.table.constant;

            _self._originTableContainer = _el.children('.' + _constants.ORIGIN_TABLE_CONTAINER_CLASS);
            _self._frozenHeaderContainer = _el.children('.' + _constants.FROZEN_HEADER_TABLE_CONTAINER_CLASS);
            _self._frozenColumnsContainer = _el.children('.' + _constants.FROZEN_COLUMNS_TABLE_CONTAINER_CLASS);
            _self._frozenColumnsHeaderContainer = _el.children('.' + _constants.FROZEN_COLUMNS_TABLE_HEADER_CONTAINER_CLASS);
        },
        _getTables: function () {
            var _self = this;

            _self._originTable = _self._originTableContainer.children('table');
            _self._originTableHeaders = _self._originTable.find('> thead > tr > th');
            _self._originTableRows = _self._originTable.find('> tbody > tr');
            _self._frozenHeaderTable = _self._frozenHeaderContainer.children('table');
            _self._frozenColumnsTable = _self._frozenColumnsContainer.children('table');
            _self._frozenColumnsHeaderTable = _self._frozenColumnsHeaderContainer.children('table');
        },
        _initEvents: function () {
            var _self = this,
                _eventNamespace = _self.eventNamespace;
            
            // Do scroll when origin table is scrolled.
            _self._originTableContainer
                .off(_eventNamespace)
                .on('scroll' + _eventNamespace, _self, function (e) {
                    e.data._frozenHeaderContainer.scrollLeft(e.data._originTableContainer.scrollLeft());
                    e.data._frozenColumnsContainer.scrollTop(e.data._originTableContainer.scrollTop());
                })

            // Reset layout when window is resized.
            _self.element.on('resize' + _eventNamespace, _self, function (e) {
                e.data.updateLayout();
            })
            .on('click' + _eventNamespace, 'th', _self, function (e) {
                var _target = $(e.target).closest('th');

                var _position = _target.index(),
                    _event = $.Event('sort.gtui.table', { index: _position });

                _target.trigger($.extend(e, _event));
            })
            .on('click' + _eventNamespace, 'a', _self, function (e) {
                var _target = $(e.target).closest('a');

                var _buttonGroupIndex = _target.index(),
                    _columnIndex = _target.closest('td').index(),
                    _rowIndex = _target.closest('tr').index();

                var _event = $.Event('linkClick.gtui.table', {
                    buttonGroupIndex: _buttonGroupIndex,
                    columnIndex: _columnIndex,
                    rowIndex: _rowIndex
                });

                _target.trigger(_event);
            })
            .on('click' + _eventNamespace, 'button', _self, function (e) {
                var _target = $(e.target).closest('button');

                var _buttonGroupIndex = _target.index(),
                    _columnIndex = _target.closest('td').index(),
                    _rowIndex = _target.closest('tr').index();

                var _event = $.Event('buttonClick.gtui.table', {
                    buttonGroupIndex: _buttonGroupIndex,
                    columnIndex: _columnIndex,
                    rowIndex: _rowIndex
                });

                _target.trigger(_event);
            });

            // Scroll origin table when table holds the frozen columns is scrolled.
            _self._frozenColumnsTable.on('mousewheel' + _eventNamespace, _self, function (e) {
                e.data._originTableContainer.scrollTop(e.data._originTableContainer.scrollTop() + e.deltaY * -1);
            });
        },
        _dealWithFrozenColumnsHeader: function () {
            var _self = this,
                    _oth = _self._originTableHeaders;

            _self._frozenColumnsHeaderTable.find('> thead > tr > th').map(function (i, th) {
                $(th).outerWidth(_oth[i].offsetWidth).outerHeight(_oth[i].offsetHeight);
            });

            _self._frozenColumnsHeaderContainer.outerWidth(_self._frozenColumnsContainer.width());
        },
        _dealWithFrozenColumns: function () {
            var _self = this,
                _oth = _self._originTableHeaders,
                _otr = _self._originTableRows,
                _width = 0;

            _self._frozenColumnsTable.find('> thead > tr > th').map(function (i, th) {
                if (i < _self._getFrozenColumnsCount()) {
                    _width += _oth[i].offsetWidth;
                    $(th).outerWidth(_oth[i].offsetWidth).outerHeight(_oth[i].offsetHeight);
                }
            });
            _self._frozenColumnsTable.find('> tbody > tr').map(function (i, tr) {
                $(tr).outerHeight(tr.offsetHeight);
            });

            _self._frozenColumnsContainer
                .outerHeight(_self._originTableContainer[0].clientHeight +
                    _self._originTable.find('thead').outerHeight())
                .outerWidth(_width + 2);
        },
        _dealWithFrozenHeader: function () {
            var _self = this,
                _oth = _self._originTableHeaders;

            _self._frozenHeaderTable.find('> thead > tr > th').map(function (i, th) {
                $(th).outerWidth(_oth[i].offsetWidth).outerHeight(_oth[i].offsetHeight);
            });

            _self._frozenHeaderContainer.outerWidth(_self._originTableContainer[0].clientWidth);
        },
        _dealWithOriginHeader: function () {
            var _marginTop = this._originTable.find('thead').outerHeight();
            this._originTable.css({ 'margin-top': _marginTop * -1 });

            this.element.css({ 'padding-top': _marginTop });

            this._originTable.find('> tbody > tr').map(function (i, tr) {
                $(tr).outerHeight(tr.offsetHeight);
            });
        },
        _dealWidthContent: function () {
            this._originTableContainer.outerHeight(this.element.outerHeight() - this._frozenHeaderContainer.outerHeight());
        },
        _getFrozenColumnsCount: function () {
            var count = parseInt(this.options.frozenColumnsCount);
            return count ? count : 0;
        },
        _hideRedundancy: function () {
            var _self = this,
                _frozenColumnCount = _self.options.frozenColumnsCount;

            // Hide unfrozen columns of _frozenColumnsTable.
            _self._frozenColumnsTable.find('> thead > tr > th').map(function (i, th) {
                if (i >= _frozenColumnCount) {
                    th.style.display = 'none';
                }
            });
            _self._frozenColumnsTable.find('> tbody > tr').map(function (i, tr) {
                $(tr).find('> td').map(function (j, td) {
                    if (j >= _frozenColumnCount) {
                        td.style.display = 'none';
                    }
                });
            });
            // Hide unfrozen columns of _frozenColumnsHeaderTable.
            _self._frozenColumnsHeaderTable.find('> thead > tr > th').map(function (i, th) {
                if (i >= _frozenColumnCount) {
                    th.style.display = 'none';
                }
            });
        },
        _destroy: function () {

        },

        updateLayout: function () {
            var _self = this;

            _self._getTables();

            _self._dealWithOriginHeader();
            _self._dealWithFrozenHeader();
            _self._dealWithFrozenColumns();
            _self._dealWithFrozenColumnsHeader();
            _self._dealWidthContent();

            _self._hideRedundancy();
        },
        updateItemsSource: function () {
            var _self = this;

            _self._getTables();

            _self.updateLayout();
        }
    });
})(jQuery);