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