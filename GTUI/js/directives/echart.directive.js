(function ($) {
    if (window.angular) {
        var gta = angular.module('gtui');

        gta.directive('gtuiEchart', function (_$config) {

            return {
                restrict: 'EA',
                link: function link(scope, element, attrs) {
                    var _chart = echarts.init(element[0]),
                        _config = _$config.getConfig(attrs);

                    scope.$watch(attrs.chartOption, function () {
                        var option = _config.convertAs ? scope[_config.convertAs][_config.optionField] : scope[_config.optionField];

                        if (angular.isObject(option)) {
                            _chart.setOption(option);
                        }
                    }, true);

                    scope.getDom = function () {

                        return {
                            'height': element[0].offsetHeight,
                            'width': element[0].offsetWidth
                        };
                    };

                    scope.$watch(scope.getDom, function () {
                        // resize echarts图表
                        _chart.resize();
                    }, true);
                }
            };
        });
    }
})(jQuery);