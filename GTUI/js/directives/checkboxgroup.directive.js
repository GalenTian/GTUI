(function ($) {
    if (window.angular && window.echarts) {
        var gta = angular.module('gtui');

        gta.directive('gtuiCheckboxGroup', function (_$utils, _$echart) {
            var DIV = '<div></div>',
                INPUT = '<input type="checkbox" />',
                LABEL = '<label></label>',
                SPAN = '<span></span>';

            var _getTemplate = function (config) {
                var _outerDiv = $(DIV).addClass('checkbox'),
                    _label = $(LABEL).addClass('checkbox-inline').attr({
                        'ng-repeat': 'item in ' + _$utils.getFieldStringByName(config, 'items'),
                        'ng-bind': 'item.' + config.displayField,
                        'ng-value': 'item.' + config.valueField
                    }),
                    _checkbox = $(INPUT).addClass('form-control');

                _outerDiv
                    .append(_label
                        .append(_checkbox)
                    );

                return _outerDiv[0].outerHTML;
            };

            return {
                restrict: 'EA',
                template: function (element, attrs) {
                    var _config = _$utils.getConfig(attrs);

                    return _getTemplate(_config);
                },
                replace: true,
                link: function link(scope, element, attrs) {
                    var _config = _$utils.getConfig(attrs);


                }
            };
        });
    }
})(jQuery);