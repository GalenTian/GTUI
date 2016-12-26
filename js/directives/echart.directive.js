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

                    window.setTimeout(function () {
                        var _option = _$utils.getFieldValueByName(scope, _config, 'option');

                        if (angular.isObject(_option)) {
                            _chart.setOption(_option);
                        }
                    }, 0);

                    _$utils.setPropertyValueByName(scope, _config, 'meta', _chart);

                    element.closest('[gtui-vertical-tile]').on('resize', { element: element, config: _config, chart: _chart }, function (e) {
                        e.data.chart.resize();
                    });

                    //scope.$watch((_config.controllerAs ? (_config.controllerAs + '.') : '') + _config.optionField, function (n, o, scope) {
                    //    if (n != o) {
                    //        var _config = _$utils.getConfig(attrs),
                    //            _option = _$utils.getFieldValueByName(scope, _config, 'option');

                    //        _chart.setOption(_option);
                    //    }
                    //}, true);

                    var _realScopt = _$utils.getScope(scope, _config);

                    _realScopt.__updateData__ = function (option) {
                        _chart.setOption(option);
                    };

                    $(window).on('resize', _chart, function (e) {
                        e.data.resize();
                    });
                }
            };
        });
    }
})(jQuery);