(function ($) {
    if (window.angular) {
        var gta = angular.module('gtui');

        gta.directive('gtuiVerticalTile', function ($compile, $timeout) {
            return {
                restrict: "EA",
                template: '',
                link: function (scope, element, attrs) {
                    $(document).ready(function () {
                        element.verticaltile();
                    });
                }
            };
        });
    }
})(jQuery);