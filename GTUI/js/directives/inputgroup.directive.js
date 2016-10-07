(function ($) {
    if (window.angular && window.echarts) {
        var gta = angular.module('gtui');

        gta.directive('gtuiInputGroup', function (_$utils, _$echart) {
            var DIV = '<div></div>',
                INPUT = '<input />',
                SPAN = '<span></span>';

            var _getTemplate = function (config) {
                var _outerDiv = $(DIV).addClass('input-group'),
                    _startInput = $(INPUT).attr({ type: 'text' }).addClass('form-control'),
                    _addon = $(SPAN).addClass('input-group-addon').text('-'),
                    _endInput = $(INPUT).attr({ type: 'text' }).addClass('form-control');

                _outerDiv
                    .append(_startInput)
                    .append(_addon)
                    .append(_endInput);

                return _outerDiv[0].outerHTML;
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