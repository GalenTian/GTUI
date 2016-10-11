(function ($) {
    if (window.angular && window.echarts) {
        var gta = angular.module('gtui'),
            CHART_THEME = 'macarons';

        gta.directive('gtuiEchart', function (_$utils, _$echart) {

            return {
                restrict: 'EA',
                link: function link(scope, element, attrs) {
                    if (element.css('min-height') === '0px') {
                        element.css({ 'min-height': 1 });
                    }

                    var _chart = echarts.init(element[0], CHART_THEME),
                        _config = _$utils.getConfig(attrs);

                    $(document).ready(function () {
                        var _option = _$utils.getFieledValueByName(scope, _config, 'option');

                        if (angular.isObject(_option)) {
                            _chart.setOption(_option);
                        }
                    });

                    element.closest('[gtui-vertical-tile]').on('resize', { element: element, config: _config, chart: _chart }, function (e) {
                        e.data.chart.resize();
                    });

                    scope.$watch((_config.convertAs ? (_config.convertAs + '.') : '') + _config.optionField, function (n, o, scope) {
                        if (n != o) {
                            var _config = _$utils.getConfig(attrs),
                                _option = _$utils.getFieledValueByName(scope, _config, 'option');

                            _chart.setOption(_option);
                        }
                    }, true);

                    $(window).on('resize', _chart, function (e) {
                        e.data.resize();
                    });
                }
            };
        });
    }
})(jQuery);