(function ($) {
    if (window.angular && window.echarts) {
        var gta = angular.module('gtui');

        gta.directive('gtuiInput', function (_$utils, _$echart) {
            var INPUT = '<input />';

            var _getTemplate = function (config, attrs) {
                var _input = $(INPUT).attr({ type: 'text' });

                if (attrs.disalbed) {
                    _input.attr('disabled', 'disabled');
                }

                return _input[0].outerHTML;
            };

            return {
                restrict: 'EA',
                template: function (element, attrs) {
                    var _config = _$utils.getConfig(attrs);

                    return _getTemplate(_config, attrs);
                },
                replace: true,
                link: function link(scope, element, attrs) {
                    var _config = _$utils.getConfig(attrs);
                }
            };
        });
    }
})(jQuery);