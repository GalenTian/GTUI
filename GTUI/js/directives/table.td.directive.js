(function ($) {
    if (window.angular) {
        var gta = angular.module('gtui');

        gta.directive('gtuiTableTd', function (_$utils) {
            var TD_HTML = '<td></td>',
                SPAN_HTML = '<span></span>',
                LINK_HTML = '<a></a>',
                BUTTON_HTML = '<button></button>',
                
                BUTTON_CLASS = 'btn btn-default btn-xs';

            var defaultConfig = function () {
                return {
                    controllerAs: '',
                    rowField: 'row',
                    columnField: 'column',
                    valueField: 'valueField',
                    contentField: 'contentField',
                    sortableField: 'sortable',
                    visibleField: 'visible',
                    sortField: 'sort',
                    typeField: 'typeField'
                };
            }();
            
            var _getTemplate = function (el, config) {
                // Template outer element
                var _td = $(TD_HTML).attr({
                    'ng-show': config.columnField + '[\'' + config.visibleField + '\']',
                });
                
                var _text = $(SPAN_HTML).attr({
                    'ng-bind': config.rowField + '[' + config.columnField + '[\'' + config.contentField + '\']]',
                    'ng-if': config.columnField + '[\'' + config.typeField + '\'].toLowerCase() === \'text\''
                });
                var _link = $(LINK_HTML).attr({
                    href: 'javascript: void(0)',
                    'ng-bind': config.rowField + '[' + config.columnField + '[\'' + config.contentField + '\']]',
                    'ng-if': config.columnField + '[\'' + config.typeField + '\'].toLowerCase() === \'link\''
                });
                var _btnGroup = $(BUTTON_HTML).addClass(BUTTON_CLASS).attr({
                    type: 'button',
                    'ng-repeat': '__btnItem__ in ' + config.rowField + '[' + config.columnField + '[\'' + config.contentField + '\']] track by $index',
                    'ng-bind': '__btnItem__.displayContent',
                    'ng-if': config.columnField + '[\'' + config.typeField + '\'].toLowerCase() === \'btn-group\'',
                    'ng-click': '__btnItem__.click($event, ' + config.rowField + '.$index)'
                });

                _td.append(_text).append(_link).append(_btnGroup);

                return _td;
            };

            return {
                restrict: "EA",
                scope: false,
                template: function (element, attrs) {
                    var _config = _$utils.getConfig(attrs);

                    $.extend(defaultConfig, _config, true);

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