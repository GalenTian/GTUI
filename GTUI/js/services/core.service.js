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
                getFieledValueByName: function (scope, config, name) {
                    var targetFiled = name + constants.FIELD;

                    return config[constants.CONVERT_AS] ?
                        scope[config[constants.CONVERT_AS]][config[targetFiled]] :
                        scope[config[targetFiled]];
                },
                getFieledStringByName: function (config, name) {
                    var targetFiled = name + constants.FIELD;

                    return config[constants.CONVERT_AS] ?
                        (config[constants.CONVERT_AS] + '.' + config[targetFiled]) :
                        config[targetFiled];
                },
                getPropertyValueByName: function (scope, config, name) {
                    return config[constants.CONVERT_AS] ?
                        scope[config[constants.CONVERT_AS]][config[name]] :
                        scope[config[name]];
                },

                setPropertyValueByName: function (scope, config, name, value) {
                    if (config[constants.CONVERT_AS])
                        scope[config[constants.CONVERT_AS]][config[name]] = value;
                    else
                        scope[config[name]] = value;
                },

                uuid: function () {
                    var s = [],
                        hexDigits = "0123456789abcdef";

                    for (var i = 0; i < 36; i++) {
                        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
                    }

                    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
                    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
                    s[8] = s[13] = s[18] = s[23] = "-";

                    return s.join("");
                }
            }

            return _serv;
        }]);
    }
})(jQuery);