(function ($) {
    if (window.angular) {
        var gta = angular.module('gtui', []);

        gta.service('_$config', [ '$parse', function ($parse) {
            var _serv = {
                getConfig: function (attrs, configAttr) {
                    if (!configAttr) {
                        configAttr = 'config'
                    }

                    return $parse(attrs[configAttr])();
                }
            }

            return _serv;
        }]);
    }
})(jQuery);