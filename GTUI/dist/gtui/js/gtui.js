/* Packaged at 19:14 Sep 12, 2016. Version: None */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);
	__webpack_require__(4);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

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

	__webpack_require__(2);
	__webpack_require__(3);

/***/ },
/* 2 */
/***/ function(module, exports) {

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
	                e.data.updateTableLayout();
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
	                //$(_frozenHeaders[i]).outerWidth($(_originHeaders[i]).outerWidth());
	            }

	            _self._originHeaders = _originHeaders;
	            _self.element.append($('<div></div>').addClass(_options.frozenHeaderTableContainerClass).append(_frozenHeader));
	            _self._frozenHeaderTable = _frozenHeader;
	            _self._frozenHeaderTableContainer = _self._frozenHeaderTable.parent();
	        },
	        _destroy: function () {

	        },
	        _updateFrozenHeaderLayout: function () {
	            var _self = this,
	                _options = _self.options,
	                fillSapns = _self._frozenHeaderTable.find('th > span.' + _options.fillSpanClass);

	            for (var i = 0, length = _self._originHeaders.length; i < length; i++) {
	                var _width = $(_self._originHeaders[i]).width();
	                $(fillSapns[0]).width(_width);
	                $(_self._originHeaders[i]).width(_width)
	            }
	        },

	        updateLayout: function () {
	            var _self = this;

	            _self._dealWithOriginHeader();
	            _self._dealWithFrozenHeader();
	            _self._dealWithFrozenColumns();
	            _self._dealWithFrozenColumnsHeader();
	        },
	        updateTableLayout: function () {
	            var _self = this;

	            _self._updateFrozenHeaderLayout();
	        }
	    });
	})(jQuery);

/***/ },
/* 3 */
/***/ function(module, exports) {

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

	            var _top = _self._elementTop,
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

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	(function ($) {
	    if (window.angular) {
	        angular.module('gtui', []);
	    }
	})(jQuery);

	// Directives
	__webpack_require__(5);
	__webpack_require__(6);
	__webpack_require__(7);
	__webpack_require__(8);

/***/ },
/* 5 */
/***/ function(module, exports) {

	(function ($) {
	    if (window.angular) {
	        var gta = angular.module('gtui');

	        gta.directive('gtuiTable', function ($compile, $timeout) {
	            return {
	                restrict: "EA",
	                scope: false,
	                template: function (element, attrs) {
	                    var _tableBordered = attrs.tableBordered,
	                        _frozenCols = attrs.frozenCols,
	                        _tableClass = [gtui.table.constant.TABLE_CLASS],
	                        _template = [];

	                    // Deal with data-config
	                    if (!attrs.config) {
	                        console.error('gtui-table: "data-config" attribute is missing.');
	                        return '<thead></thead>';
	                    }
	                    else {
	                        var _config = gtui.utils.parseObj(attrs.config);
	                    }

	                    // Table Cell Vertical Bordered
	                    if (_config.tableCellVerticalBordered) _tableClass.push(gtui.table.constant.TABLE_CELL_VERTICAL_BORDERED_CLASS);
	                    // Table Cell Horizontal Bordered
	                    if (_config.tableCellHorizontalBordered) _tableClass.push(gtui.table.constant.TABLE_CELL_HORIZONTAL_BORDERED_CLASS);
	                    // Table Striped
	                    if (_config.tableStriped) {
	                        switch (_config.tableStriped.toLowerCase()) {
	                            case 'odd':
	                                _tableClass.push(gtui.table.constant.TABLE_STRIPED_ODD);
	                                break;
	                            case 'even':
	                                _tableClass.push(gtui.table.constant.TABLE_STRIPED_EVEN);
	                                break;
	                        }
	                    }
	                    element.attr('data-frozen-columns-count', _config.frozenColumnsCount);

	                    var div = $('<div></div>')
	                        .addClass(gtui.table.constant.TABLE_CONTAINER_CLASS + (_config.tableBordered ? (' ' + gtui.table.constant.TABLE_BORDERED_CLASS) : ''))
	                        .attr('data-frozen-columns-count', _config.frozenColumnsCount);

	                    var _frozenInnerTable = element.children('table').addClass(_tableClass.join(' '));
	                    if (_frozenInnerTable) div.append(_frozenInnerTable);
	                    else console.error('"table" tag is missing. It is required when "data-frozen-cols" attribute is set. And you should ensure "thead" and "tbody" tags are included in this tag.');

	                    return div.prop("outerHTML");
	                },
	                replace: true,
	                transclude: false,
	                link: function (scope, element, attrs) {
	                    var _frozenCols = parseInt(attrs.frozenColumnsCount);
	                    _frozenCols = _frozenCols ? _frozenCols : 0;

	                    scope.metaTable = element;

	                    $(document).ready(function () {
	                        element.table({
	                            frozenColumnsCount: _frozenCols
	                        });
	                    });
	                }
	            };
	        });
	    }
	})(jQuery);

/***/ },
/* 6 */
/***/ function(module, exports) {

	(function ($) {
	    if (window.angular) {
	        var gta = angular.module('gtui');

	        gta.directive('gtuiTableHead', function ($compile, $timeout) {
	            return {
	                restrict: "EA",
	                scope: false,
	                template: function (element, attrs) {
	                    var _template = [],
	                        _config = gtui.utils.parseObj(element.closest('.table-container').attr('data-config'));

	                    _template.push('<thead>');
	                    _template.push('  <tr ng-repeat="row in ' + _config.as + '.' + _config.columnsField + '">');
	                    _template.push('    <th ng-repeat="item in row.' + _config.columnsField +
	                        '" colspan="{{item.' + _config.colspanField +
	                        '}}" rowspan="{{item.' + _config.rowspanField +
	                        '}}">{{item.' + _config.colDisplayField + '}}</th>');
	                    _template.push('  </tr>');
	                    _template.push('</thead>');

	                    return _template.join('');
	                },
	                replace: true,
	                transclude: false,
	                link: function (scope, element, attrs) {
	                    
	                }
	            };
	        });
	    }
	})(jQuery);

/***/ },
/* 7 */
/***/ function(module, exports) {

	(function ($) {
	    if (window.angular) {
	        var gta = angular.module('gtui'),
	            inputCellTemplate = function (config) {

	            };

	        gta.directive('gtuiTableBody', function ($compile, $timeout) {
	            return {
	                restrict: "EA",
	                scope: false,
	                template: function (element, attrs) {
	                    var _template = [],
	                        _config = gtui.utils.parseObj(element.closest('.table-container').attr('data-config'));

	                    _template.push('<tbody>');
	                    _template.push('  <tr ng-repeat="row in ' + _config.as + '.' + _config.itemsSourceField + '">');
	                    _template.push('    <td ng-repeat="cell in ' + _config.as + '.' + _config.rowsField + '">');
	                    _template.push('     ' + inputCellTemplate(_config));
	                    _template.push('    </td>');
	                    _template.push('  </tr>');
	                    _template.push('</tbody>');

	                    return _template.join('');
	                },
	                replace: true,
	                transclude: false,
	                link: function (scope, element, attrs) {
	                    
	                }
	            };
	        });
	    }
	})(jQuery);

/***/ },
/* 8 */
/***/ function(module, exports) {

	(function ($) {
	    if (window.angular) {
	        var gta = angular.module('gtui');

	        gta.directive('gtuiVerticalTile', function ($compile, $timeout) {
	            return {
	                restrict: "EA",
	                template: '',
	                link: function (scope, element, attrs) {
	                    $(document).ready(function () {
	                        element.verticaltile();
	                    });
	                }
	            };
	        });
	    }
	})(jQuery);

/***/ }
/******/ ]);