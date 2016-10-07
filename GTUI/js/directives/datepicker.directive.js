(function ($) {
    if (window.angular && window.echarts) {
        var gta = angular.module('gtui');

        gta.directive('gtuiDatepicker', function (_$utils, _$echart) {
            var DIV = '<div></div>',
                INPUT = '<input />',
                SPAN = '<span></span>';

            var _getRangeTemplate = function (config) {
                var _outerDiv = $(DIV).addClass('input-daterange input-group'),
                    _startInput = $(INPUT).attr({ type: 'text' }).addClass('form-control'),
                    _addon = $(SPAN).addClass('input-group-addon').text('-'),
                    _endInput = $(INPUT).attr({ type: 'text' }).addClass('form-control');

                _outerDiv
                    .append(_startInput)
                    .append(_addon)
                    .append(_endInput);

                return _outerDiv[0].outerHTML;
            };
            var _getDefaultTemplate = function (config) {
                _getRangeTemplate();
            };

            return {
                restrict: 'EA',
                template: function (element, attrs) {
                    var _config = _$utils.getConfig(attrs);

                    switch (_config.type) {
                        case 'datepicker-range':
                            return _getRangeTemplate(_config);
                        default:
                            return _getDefaultTemplate(_config);
                    }
                },
                replace: true,
                link: function link(scope, element, attrs) {
                    var _config = _$utils.getConfig(attrs);

                    $(document).ready(function () {
                        element.datepicker({
                            format: "yyyy-mm-dd",
                            language: "zh-CN",
                            autoclose: true,
                            todayHighlight: true
                        });
                    });
                }
            };
        });
    }
})(jQuery);