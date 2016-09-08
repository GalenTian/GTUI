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