(function ($) {
    if (window.angular && window.echarts) {
        var gta = angular.module('gtui'),
            
            DIV = '<div></div>',
            
            ROW_CLASS = 'row',
            COLUMN_CLASS = 'col-lg-4 col-md-6 col-sm-6';

        gta.directive('gtuiGrid', function (_$utils, _$echart) {

            return {
                restrict: 'EA',
                template: function (element, attrs) {
                    var _columns = element.children('[gtui-column], .gtui-column, gtui-column');

                    var _row = $(DIV).addClass(ROW_CLASS);

                    for (var i = 0, length = _columns.length; i < length; i++) {
                        var _col = $(DIV).addClass(COLUMN_CLASS);

                        _row.append(_col.append(_columns[i]));
                    }

                    return _row[0].outerHTML;
                },
                replace: true,
                link: function link(scope, element, attrs) {
                    var _config = _$utils.getConfig(attrs);

                    
                }
            };
        });
    }
})(jQuery);