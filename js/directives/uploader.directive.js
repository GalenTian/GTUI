(function ($) {
    if (window.angular) {
        var _gta = angular.module('gtui');

        _gta.directive('gtuiUploader', function (_$utils) {
            return {
                restrict: "EA",
                link: function (scope, element, attrs) {
                    var _config = _$utils.getConfig(attrs);

                    element.on('change.uploader.gtui', function (e) {
                        scope.$apply(function () {
                            _$utils.setPropertyValueByName(scope, _config, 'valueField', e.target.value);
                        });
                    });

                    scope.$watch(_$utils.getFieldStringByName(_config, 'value'), function (nVal, oVal) {
                        if (nVal != oVal && !nVal)
                            element.val('');
                    });
                }
            };
        });
    }
})(jQuery);