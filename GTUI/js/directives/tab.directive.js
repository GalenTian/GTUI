(function ($) {
    if (window.angular) {
        var gta = angular.module('gtui');

        gta.directive('gtuiTab', function (_$utils) {
            var DIV = '<div></div>',
                UL = '<ul></ul>',
                LI = '<li></li>',
                A = '<a></a>';

            var TAB_CLASS = 'tabs',
                UL_CLASS = 'nav nav-tabs';

            var _getTemplate = function (el, config) {
                var _div$ = $(DIV).addClass(TAB_CLASS),
                    _ul$ = $(UL).addClass(UL_CLASS).attr({ role: 'tablist' }),
                    _li$ = $(LI).attr({
                        'ng-class': '{ active: $index === ' + _$utils.getFieldStringByName(config, 'selected') + ' }',
                        'aria-selected': '$index === ' + _$utils.getFieldStringByName(config, 'selected'),
                        'ng-repeat': 'item in ' + _$utils.getFieldStringByName(config, 'tabItems'),
                        role: 'tab',
                        tabindex: '{{$index === ' + _$utils.getFieldStringByName(config, 'selected') + ' ? 0 : -1}}',
                        'aria-controls': '{{item.' + config.panelIdField + '}}'
                    }),
                    _a$ = $(A).attr({
                        'ng-bind': 'item.' + config['headerContentField'],
                        tabindex: -1,
                        href: '#'
                    });

                return _div$.append(_ul$.append(_li$.append(_a$))).append(el.children());
            };

            return {
                restrict: "AE",
                template: function (element, attrs) {
                    var _config = _$utils.getConfig(attrs);

                    return _getTemplate(element, _config).prop("outerHTML");
                },
                replace: true,
                link: function (scope, element, attrs) {
                    var _config = _$utils.getConfig(attrs);

                    $(document).ready(function () {
                        element.tab({
                            selectedIndex: _$utils.getFieldValueByName(scope, _config, 'selected')
                        });
                    })

                    element.on('selectedIndexChanged.gtui.tab', element, function (e, d) {
                        _$utils.setPropertyValueByName(scope, _config, 'selectedField', d.newValue);
                        scope.$apply();
                    });
                }
            };
        });
    }
})(jQuery);