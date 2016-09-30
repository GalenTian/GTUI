(function ($) {
    if (window.angular) {
        var gta = angular.module('gtui');

        gta.directive('gtuiTableHead', function () {
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