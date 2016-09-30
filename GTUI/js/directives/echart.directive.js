(function ($) {
    if (window.angular) {
        var gta = angular.module('gtui');


        gta.directive('gtuiEchart', function ($http, $window) {

            function link($scope, element, attrs) {
                $(document).ready(function () {
                    var myChart = echarts.init(element[0]);

                    $scope.$watch(attrs.chartOption, function () {
                        var option = $scope.$eval(attrs.chartOption);

                        if (angular.isObject(option)) {
                            myChart.setOption(option);
                        }
                    }, true);

                    $scope.getDom = function () {

                        return {
                            'height': element[0].offsetHeight,
                            'width': element[0].offsetWidth
                        };
                    };

                    $scope.$watch($scope.getDom, function () {
                        // resize echarts图表
                        myChart.resize();
                    }, true);
                });
                
            }

            return {
                restrict: 'A',
                link: link
            };
        });
    }
})(jQuery);