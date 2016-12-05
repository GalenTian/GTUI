(function ($) {
    if (window.angular) {
        var gta = angular.module('gtui');

        gta.directive('gtuiTabPanel', function (_$utils) {

            return {
                restrict: "AE",
                link: function (scope, element, attrs) {
                    element.attr('role', 'tabpanel');
                }
            };
        });
    }
})(jQuery);