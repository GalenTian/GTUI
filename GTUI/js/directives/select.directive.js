(function ($) {
    if (window.angular && window.echarts) {
        var gta = angular.module('gtui');

        gta.directive('gtuiSelect', function (_$utils, _$echart) {
            var _SELECT = '<select></select>';

            var _getTemplate = function (config) {
                var select = $(_SELECT)
                    .addClass('form-control')
                    .attr({
                        'ng-model': _$utils.getFieledStringByName(config, 'selected'),
                        'ng-options': 'm.' + config.displayField + ' for m in ' + _$utils.getFieledStringByName(config, 'optionItems')
                    });

                return select[0].outerHTML;
            };

            return {
                restrict: 'EA',
                template: function (element, attrs) {
                    var _config = _$utils.getConfig(attrs);

                    return _getTemplate(_config);
                },
                replace: true,
                link: function link(scope, element, attrs) {
                    var _config = _$utils.getConfig(attrs);

                }
            };
        });
    }
})(jQuery);