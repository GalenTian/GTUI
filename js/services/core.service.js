(function ($) {
    if (window.angular) {
        var gta = angular.module('gtui');

        var constants = function () {
            return {
                FIELD: 'Field',
                CONVERT_AS: 'controllerAs'
            };
        }();

        var _ajax = function (url, data, successCallback, errorCallback, isAsync) {
            if (!errorCallback) {
                errorCallback = function (data, status, config, statusText) {
                    console.error(data);
                };
            }

            $.ajax({
                type: 'post',
                url: url,
                contentType: "application/x-www-form-urlencoded",
                //contentType: "application/json",
                //contentType: "text/json",
                //contentType: "application/json; charset=utf-8",
                data: 'jData=' + JSON.stringify(data),
                async: isAsync,
                dataType: 'json',
                success: function (d, s, r) {
                    d = angular.fromJson(d);
                    successCallback.apply(this, arguments);
                },
                error: function (d, s, r) {
                    d = angular.fromJson(d);
                    errorCallback.apply(this, arguments);
                }
            });
        };

        gta.service('_$utils', function ($parse, $http) {
            var _serv = {
                getConfig: function (attrs, configAttr) {
                    if (!configAttr) {
                        configAttr = 'config';
                    }

                    return $parse(attrs[configAttr])();
                },
                getScope: function (scope, config) {
                    return config[constants.CONVERT_AS] ? scope[config[constants.CONVERT_AS]] : scope;
                },
                getValueByName: function (scope, config, name) {
                    return config[constants.CONVERT_AS] ?
                        scope[config[constants.CONVERT_AS]][name] :
                        scope[name];
                },
                getFieldValueByName: function (scope, config, name) {
                    var _targetField = name + constants.FIELD,
                        _fieldValue = config[_targetField];

                    if (_fieldValue.indexOf('[') > 0 || _fieldValue.indexOf('.') > 0) {
                        _fieldValue = _fieldValue.replace(/\[/g, '.');
                        _fieldValue = _fieldValue.replace(/\]/g, '');
                        _fieldValue = _fieldValue.replace(/'/g, '');
                        _fieldValue = _fieldValue.replace(/"/g, '');

                        var _properties = _fieldValue.split('.'),
                            _value = config[constants.CONVERT_AS] ?
                                scope[config[constants.CONVERT_AS]][_properties[0]] :
                                scope[_properties[0]];

                        for (var i = 1, length = _properties.length; i < length; i++) {
                            _value = _value[_properties[i]];
                        }

                        return _value;
                    }
                    else 
                        return config[constants.CONVERT_AS] ?
                            scope[config[constants.CONVERT_AS]][_fieldValue] :
                            scope[_fieldValue];
                },
                getFieldStringByName: function (config, name) {
                    var _targetField = name + constants.FIELD;

                    return config[constants.CONVERT_AS] ?
                        (config[constants.CONVERT_AS] + '.' + config[_targetField]) :
                        config[_targetField];
                },
                getPropertyValueByName: function (scope, config, name) {
                    return config[constants.CONVERT_AS] ?
                        scope[config[constants.CONVERT_AS]][config[name]] :
                        scope[config[name]];
                },

                setPropertyValueByName: function (scope, config, name, value) {
                    var _scope;
                    if (config[constants.CONVERT_AS])
                        _scope = scope[config[constants.CONVERT_AS]]
                    else
                        _scope = scope[config[name]];

                    var _fieldValue = config[name];
                    if (_fieldValue.indexOf('[') > 0 || _fieldValue.indexOf('.') > 0) {
                        _fieldValue = _fieldValue.replace(/\[/g, '.');
                        _fieldValue = _fieldValue.replace(/\]/g, '');
                        _fieldValue = _fieldValue.replace(/'/g, '');
                        _fieldValue = _fieldValue.replace(/"/g, '');

                        var _properties = _fieldValue.split('.'),
                            _value = _scope[_properties[0]];

                        for (var i = 1, length = _properties.length; i < length; i++) {
                            if (i < length - 1)
                                _value = _value[_properties[i]];
                            else {
                                _value[_properties[i]] = value
                            }
                        }
                    }
                    else
                        _scope[_fieldValue] = value;
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
                },

                post: function (url, data, successCallback, errorCallback) {
                    _ajax(url, data, successCallback, errorCallback, true);
                },
                postSync: function (url, data, successCallback, errorCallback) {
                    _ajax(url, data, successCallback, errorCallback, false);
                }
            }

            return _serv;
        });
    }
})(jQuery);