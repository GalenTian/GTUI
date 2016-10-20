(function ($) {
    if (window.angular) {
        var gta = angular.module('gtui');

        gta.directive('gtuiTableTd', function (_$utils) {
            var HEADER_PROP = 'headerProp',
                ITEM_PROP = 'itemProp',

                VALUE_FIELD = 'valueField',
                VISIBLE_FIELD = 'visible',
                TYPE_FIELD = 'type',
                ACTIONS_FIELD = 'actionsField',

                TD_HTML = '<td></td>',
                SPAN_HTML = '<span></span>',
                LINK_HTML = '<a></a>',
                BUTTON_HTML = '<button></button>',
                
                BUTTON_CLASS = 'btn btn-default btn-xs';

            var _getTemplate = function (el, config) {
                // Template outer element
                var _td = $(TD_HTML).attr({
                    'ng-show': config[HEADER_PROP] + '[\'' + VISIBLE_FIELD + '\']',
                });
                
                var _text = $(SPAN_HTML).attr({
                    'ng-bind': config[ITEM_PROP] + '[' + config[HEADER_PROP] + '[\'' + VALUE_FIELD + '\']]',
                    'ng-if': config[HEADER_PROP] + '[\'' + TYPE_FIELD + '\'].toLowerCase() === \'text\''
                });
                var _link = $(LINK_HTML).attr({
                    href: 'javascript: void(0)',
                    'ng-bind': config[ITEM_PROP] + '[' + config[HEADER_PROP] + '[\'' + VALUE_FIELD + '\']]',
                    'ng-if': config[HEADER_PROP] + '[\'' + TYPE_FIELD + '\'].toLowerCase() === \'link\''
                });
                var _btnGroup = $(BUTTON_HTML).addClass(BUTTON_CLASS).attr({
                    type: 'button',
                    'ng-repeat': '__btnItem__ in ' + config[ITEM_PROP] + '[' + config[HEADER_PROP] + '[\'' + ACTIONS_FIELD + '\']]',
                    'ng-bind': '__btnItem__.displayContent',
                    'ng-if': config[HEADER_PROP] + '[\'' + TYPE_FIELD + '\'].toLowerCase() === \'btn-group\''
                });

                _td.append(_text).append(_link).append(_btnGroup)

                return _td;
            };

            return {
                restrict: "EA",
                scope: false,
                template: function (element, attrs) {
                    var _config = _$utils.getConfig(attrs);

                    return _getTemplate(element, _config).prop("outerHTML");
                },
                replace: true,
                transclude: false,
                link: function (scope, element, attrs) {
                    
                }
            };
        });
    }
})(jQuery);