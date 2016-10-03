(function ($) {
    if (window.angular) {
        var gta = angular.module('gtui');

        var constants = function () {
            return {
                FIELD: 'Field',
                CONVERT_AS: 'convertAs'
            };
        }();

        gta.service('_$utils', ['$parse', function ($parse) {
            var _serv = {
                getConfig: function (attrs, configAttr) {
                    if (!configAttr) {
                        configAttr = 'config'
                    }

                    return $parse(attrs[configAttr])();
                },
                getFiledByName: function (scope, config, name) {
                    var targetFiled = name + constants.FIELD;

                    return config[constants.CONVERT_AS] ?
                        scope[config[constants.CONVERT_AS]][config[targetFiled]] :
                        scope[config[targetFiled]];
                }
            }

            return _serv;
        }]);
    }
})(jQuery);