(function ($) {
    if (window.angular) {
        var gta = angular.module('gtui'),

            _dataConfigField = 'table-config',
            _divHTML = '<div></div>',
            _tbodyHTML = 'tbody',

            _SORT_NONE = 'none',
            _SORT_ASC = 'asc',
            _SORT_DESC = 'desc',

            _getTableClass = function (config) {
                var _tableClass = [gtui.table.constant.TABLE_CLASS];

                if (config.tableBordered) {
                    _tableClass.push(gtui.table.constant.TABLE_BORDERED_CLASS);
                }
                if (config.tableStriped) {
                    _tableClass.push(gtui.table.constant.TABLE_STRIPED);
                }

                return _tableClass.join(' ');
            },
            _getTemplate = function (el, config) {
                // Template outer element
                var _div = $(_divHTML).addClass(gtui.table.constant.TABLE_CONTAINER_CLASS),

                    // tables
                    _originTableTemplate = el.children('table'),
                    _frozenHeaderTemplate,
                    _frozenColumnsTemplate,
                    _frozenColumnsHeaderTemplate,

                    // table wrapers
                    _originTableWrapper = $(_divHTML).addClass(gtui.table.constant.ORIGIN_TABLE_CONTAINER_CLASS),
                    _frozenHeaderWrapper = $(_divHTML).addClass(gtui.table.constant.FROZEN_HEADER_TABLE_CONTAINER_CLASS),
                    _frozenColumnsTableWrapper = $(_divHTML).addClass(gtui.table.constant.FROZEN_COLUMNS_TABLE_CONTAINER_CLASS),
                    _frozenColumnsHeaderWrapper = $(_divHTML).addClass(gtui.table.constant.FROZEN_COLUMNS_TABLE_HEADER_CONTAINER_CLASS),

                    _frozenColumnsCount = parseInt(config.frozenColumnsCount);

                // Deal with frozenColumnsCount.
                _frozenColumnsCount = _frozenColumnsCount ? _frozenColumnsCount : 0;

                var _tableClass = _getTableClass(config);

                // Add classes to original table template.
                _originTableTemplate.addClass(_tableClass);

                // Generate table which holds the frozen headers on top of this table-ish component based on the original table.
                _frozenHeaderTemplate = _originTableTemplate.clone();
                _frozenHeaderTemplate.children(_tbodyHTML).remove();

                // Generate table which holds the frozen columns on left of this table-ish component based on the original table.
                _frozenColumnsTemplate = _originTableTemplate.clone();

                // Generate the table holds the headers of the table holds the frozen columns.
                // This table is fixed on top, and fixed on left.
                _frozenColumnsHeaderTemplate = _frozenColumnsTemplate.clone();
                _frozenColumnsHeaderTemplate.children(_tbodyHTML).remove();

                _div.append(_originTableWrapper.append(_originTableTemplate))
                    .append(_frozenHeaderWrapper.append(_frozenHeaderTemplate))
                    .append(_frozenColumnsTableWrapper.append(_frozenColumnsTemplate))
                    .append(_frozenColumnsHeaderWrapper.append(_frozenColumnsHeaderTemplate));

                return _div.prop("outerHTML");
            };

        gta.directive('gtuiTable', function (_$utils) {
            return {
                restrict: "EA",
                scope: false,
                template: function (element, attrs) {
                    var _config = _$utils.getConfig(attrs);

                    return _getTemplate(element, _config);
                },
                replace: true,
                transclude: false,
                link: function (scope, element, attrs) {
                    var _config = _$utils.getConfig(attrs);

                    _frozenCols = _config.frozenColumnsCount ? _config.frozenColumnsCount : 0;

                    if (_config.controllerAs) {
                        scope[_config.controllerAs].metaTable = element;
                    }
                    else {
                        scope.metaTable = element;
                    }

                    scope.__sortBy__ = [];

                    element.on('sort.gtui.table', { scope: scope, config: _config }, function (e) {
                        var _scope = e.data.scope,
                            _sortBy = _scope.__sortBy__,
                            _config = e.data.config,
                            _index = e.index,
                            _cols = _$utils.getFieldValueByName(e.data.scope, _config, 'columns'),
                            _col = _cols[_index];

                        if (_col.sortable) {
                            _col.sort = _col.sort === _SORT_NONE ? _SORT_ASC : (_col.sort === _SORT_ASC ? _SORT_DESC : _SORT_ASC);

                            if (e.ctrlKey) {
                                var position = -1;

                                for (var i = 0, length = _sortBy.length; i < length; i++) {
                                    if (_sortBy[i].columnField === _col.valueField) {
                                        _sortBy[i].sort = _col.sort;
                                        position = i;
                                    }
                                }

                                if (position === -1) {
                                    _sortBy.push({ columnField: _col.valueField, sort: _SORT_ASC });
                                }
                            }
                            else {
                                _sortBy = [];

                                for (var i = 0, length = _cols.length; i < length; i++) {
                                    if (i !== _index)
                                        _cols[i].sort = _SORT_NONE;
                                }

                                _sortBy.push({ columnField: _col.valueField, sort: _col.sort });
                            }
                        }

                        e.sortBy = _sortBy;

                        _scope.$emit('sort.gtui.table', e);
                    })
                    .on('linkClick.gtui.table', scope, function (e) {
                        e.data.$emit('linkClick.gtui.table', e);
                    })
                    .on('buttonClick.gtui.table', scope, function (e) {
                        e.data.$emit('buttonClick.gtui.table', e);
                    });

                    $(document).ready(function () {
                        element.table({
                            frozenColumnsCount: _config.frozenColumnsCount
                        });
                    });
                }
            };
        });
    }
})(jQuery);