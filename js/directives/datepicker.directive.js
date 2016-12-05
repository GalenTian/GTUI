(function ($) {
    if (window.angular) {
        var gta = angular.module('gtui');

        gta.directive('gtuiDatepicker', function (_$utils, _$echart) {
            var DIV = '<div></div>',
                INPUT = '<input />',
                SPAN = '<span></span>';

            var _getRangeTemplate = function (config) {
                var _outerDiv = $(DIV).addClass('input-daterange input-group'),
                    _startInput = $(INPUT).attr({ type: 'text', 'ng-module': _$utils.getFieldStringByName(config, 'start') }).addClass('form-control'),
                    _addon = $(SPAN).addClass('input-group-addon').text('-'),
                    _endInput = $(INPUT).attr({ type: 'text', 'ng-module': _$utils.getFieldStringByName(config, 'end') }).addClass('form-control');

                _outerDiv
                    .append(_startInput)
                    .append(_addon)
                    .append(_endInput);

                return _outerDiv[0].outerHTML;
            };
            var _getDefaultTemplate = function (config) {
                var _input = $(INPUT).attr({ type: 'text', 'ng-module': _$utils.getFieldStringByName(config, 'date') }).addClass('form-control');

                return _input[0].outerHTML;
            };

            return {
                restrict: 'EA',
                template: function (element, attrs) {
                    var _config = _$utils.getConfig(attrs);

                    switch (_config.type) {
                        case 'date-range':
                            return _getRangeTemplate(_config);
                        default:
                            return _getDefaultTemplate(_config);
                    }
                },
                replace: true,
                link: function link(scope, element, attrs) {
                    var _config = _$utils.getConfig(attrs);

                    $(document).ready(function () {
                        element.datepicker({
                            format: "yyyy-mm-dd",
                            language: "zh-CN",
                            autoclose: true,
                            todayHighlight: true
                        });
                    });

                    if (element[0].nodeName === 'INPUT') {
                        scope.$watch(_$utils.getFieldStringByName(_config, 'date'), function (nVal, oVal, scope) {
                            if (nVal !== oVal) {
                                element.datepicker('update', nVal);
                            }
                        });

                        element
                            .off('changeDate')
                            .on('changeDate', { scope: scope, config: _config, element: element }, function (e) {
                                _$utils.setPropertyValueByName(e.data.scope, e.data.config, 'dateField', e.data.element.val());
                            });
                    }
                    else {
                        scope.$watch(_$utils.getFieldStringByName(_config, 'start'), function (nVal, oVal, scope) {
                            if (nVal !== oVal) {
                                element.children('input:first').datepicker('update', nVal);
                            }
                        });
                        scope.$watch(_$utils.getFieldStringByName(_config, 'end'), function (nVal, oVal, scope) {
                            if (nVal !== oVal) {
                                element.children('input:last').datepicker('update', nVal);
                            }
                        });

                        element.children('input:first')
                            .off('changeDate')
                            .on('changeDate', { scope: scope, config: _config, element: element }, function (e) {
                                _$utils.setPropertyValueByName(e.data.scope, e.data.config, 'startField', e.data.element.children('input:first').val());
                            });

                        element.children('input:last')
                            .off('changeDate')
                            .on('changeDate', { scope: scope, config: _config, element: element }, function (e) {
                                _$utils.setPropertyValueByName(e.data.scope, e.data.config, 'endField', e.data.element.children('input:last').val());
                            });
                    }
                }
            };
        });
    }
})(jQuery);