(function ($) {
    if (window.angular) {
        var gta = angular.module('gtui'),

            _dataConfigField = 'table-config',

            getTemplate = function (element, config) {

            };

        gta.directive('gtuiTableHead', function ($compile, $timeout) {
            return {
                restrict: "EA",
                scope: false,
                template: function (element, attrs) {
                    // Deal with data-config
                    if (!attrs.config) {
                        console.error('gtui-table: "data-config" attribute is missing.');
                        return _divHTML;
                    }
                    else {
                        var _config = gtui.utils.parseObj(attrs.config);
                        element.data(_dataConfigField, _config)
                    }

                    return getTemplate(element, _config).prop("outerHTML");
                },
                replace: true,
                transclude: false,
                link: function (scope, element, attrs) {

                }
            };
        });
    }
})(jQuery);