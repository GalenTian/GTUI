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
            originTableContainerClass: 'table-content',
            frozenHeaderTableContainerClass: 'table-frozen-header',
            frozenColumnsTableContainerClass: 'table-frozen-columns',
            frozenColumnsTableHeaderContainerClass: 'table-frozen-columns-header',

            tableClass: 'table',
            fillSpanClass: 'fill-span',

            frozenColumnsCount: 0
        },

        _create: function () {
            var _self = this,
                _options = _self.options,
                _el = _self.element,
                _origin = _el.children('table');

            _origin.wrap($('<div></div>').addClass(_options.originTableContainerClass));

            _self._originTable = _origin;
            _self._originTableContainer = _self._originTable.parent();

            _self._createFrozenHeader();
            _self._createFrozenColumns();
            _self._createFrozenColumnsHeader();

            _self.updateLayout();

            _self._initEvents();
        },
        _initEvents: function () {
            var _self = this,
                _eventNamespace = _self.eventNamespace;
            _self._originTableContainer
                .off(_eventNamespace)
                .on('scroll' + _eventNamespace, _self, function (e) {
                    e.data._frozenHeaderTableContainer.scrollLeft(e.data._originTableContainer.scrollLeft());
                    e.data._frozenColumnsTableContainer.scrollTop(e.data._originTableContainer.scrollTop());
                })
            _self.element.on('resize' + _eventNamespace, _self, function (e) {
                e.data.updateLayout();
            });
        },
        _dealWithFrozenColumnsHeader: function () {
            this._frozenColumnsHeaderTableContainer.width(this._frozenColumnsTableContainer.width());
        },
        _dealWithFrozenColumns: function () {
            this._frozenColumnsTableContainer.height(this._originTableContainer[0].clientHeight +
                this._originTable.find('thead').outerHeight());
        },
        _dealWithFrozenHeader: function () {
            this._frozenHeaderTableContainer.width(this._originTableContainer[0].clientWidth);
        },
        _dealWithOriginHeader: function () {
            var _marginTop = this._originTable.find('thead').outerHeight();
            this._originTable.css({ 'margin-top': _marginTop * -1 });

            this.element.css({ 'padding-top': _marginTop });
        },
        _createFrozenColumnsHeader: function () {
            var _self = this,
                _options = _self.options,
                _frozenColumnsHeader = _self._frozenColumnsTable.clone();

            _frozenColumnsHeader.children('tbody').remove();

            _self._frozenColumnsHeaderTableContainer = $('<div></div>').addClass(_options.frozenColumnsTableHeaderContainerClass);
            _self._frozenColumnsHeaderTable = _frozenColumnsHeader;
            _self.element.append(_self._frozenColumnsHeaderTableContainer.append(_self._frozenColumnsHeaderTable));
        },
        _createFrozenColumns: function () {
            var _self = this,
                _options = _self.options,
                _table = $('<table></table>'),
                _frozenColumns, _tempRows, _origin, _originRows;

            _frozenColumns = _self._originTable.clone();
            _tempRows = _frozenColumns.find('> tbody > tr');
            _origin = _self._originTable;
            _originRows = _origin.find('> tbody > tr');

            for (var i = 0, length = _tempRows.length; i < length; i++) {
                var _row = $(_tempRows[i]),
                    _cloneRow = _row.clone(),
                    _cells = _cloneRow.children('td'),
                    _height = $(_originRows[i]).height();

                _row.html('');

                for (var j = 0; j < _options.frozenColumnsCount; j++) {
                    _row.append($(_cells[j]).height(_height));
                }

                $('td', _originRows[i]).outerHeight(_height);
            }

            _tempRows = _frozenColumns.find('> thead > tr');
            _originRows = _self._frozenHeaderTable.find('> thead > tr');
            var containerWidth = 0;

            for (var i = 0, length = _tempRows.length; i < length; i++) {
                var _row = $(_tempRows[i]),
                    _cloneRow = $(_originRows[i]),
                    _cells = _cloneRow.children('th'),
                    _height = _cloneRow.outerHeight();

                _row.html('');

                var width = 0;
                for (var j = 0; j < _options.frozenColumnsCount; j++) {
                    _row.append($(_cells[j]).clone().outerHeight(_height));
                    width += _cells[j].offsetWidth;
                }

                containerWidth = Math.max(width, containerWidth);
            }

            _self._frozenColumnsTableContainer = $('<div></div>').addClass(_options.frozenColumnsTableContainerClass).width(containerWidth ? containerWidth + 2 : 0);
            _self._frozenColumnsTable = _frozenColumns;
            _self.element.append(_self._frozenColumnsTableContainer.append(_self._frozenColumnsTable));
        },
        _createFrozenHeader: function () {
            var _self = this,
                _options = _self.options,
                _frozenHeader,
                _originHeaders, _frozenHeaders;

            _frozenHeader = _self._originTable.clone();
            _frozenHeader.children('tbody').remove();

            _originHeaders = _self._originTable.find('th');
            _frozenHeaders = _frozenHeader.find('th');

            for (var i = 0, length = _originHeaders.length; i < length; i++) {
                $(_frozenHeaders[i]).append(
                    $('<span></span>').addClass(_options.fillSpanClass).width($(_originHeaders[i]).width())
                );
            }

            _self.element.append($('<div></div>').addClass(_options.frozenHeaderTableContainerClass).append(_frozenHeader));
            _self._frozenHeaderTable = _frozenHeader;
            _self._frozenHeaderTableContainer = _self._frozenHeaderTable.parent();
        },
        _destroy: function () {

        },

        updateLayout: function () {
            var _self = this;

            _self._dealWithOriginHeader();
            _self._dealWithFrozenHeader();
            _self._dealWithFrozenColumns();
            _self._dealWithFrozenColumnsHeader();
        }
    });
})(jQuery);