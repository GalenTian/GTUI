(function ($) {
    if (window.angular) {
        var gta = angular.module('gtui');

        gta.directive('gtuiTableTh', function (_$utils) {
            var COLUMN_FIELD = '__column__',
                TH_HTML = '<th></th>',
                SPAN_HTML = '<span></span>',
                
                SORTABLE_CLASS = 'sortable';

            var defaultConfig = function () {
                return {
                    controllerAs: 'vm',
                    columnsField: 'columns',
                    sortableField: 'sortable',
                    visibleField: 'visible',
                    sortField: 'sort',
                    displayField: 'displayContent'
                };
            }();
            
            var _getTemplate = function (el, config) {
                // Template outer element
                var _th = $(TH_HTML).attr({
                    'ng-repeat': COLUMN_FIELD + ' in ' + _$utils.getFieldStringByName(config, 'columns'),
                    'ng-show': COLUMN_FIELD + '.' + config.visibleField,
                    'ng-class': '{ \'' + SORTABLE_CLASS  + '\': ' + COLUMN_FIELD + '.' + config.sortableField + ' }'
                });

                var _spanContent = $(SPAN_HTML).attr({
                    'ng-bind': COLUMN_FIELD + '.' + config.displayField
                });

                var _spanIcon = $(SPAN_HTML).attr({
                    'ng-if': COLUMN_FIELD + '.' + config.sortableField,
                    'ng-class': '{ \'glyphicon glyphicon-triangle-top\': ' + COLUMN_FIELD + '.' + config.sortField +
                        ' === \'asc\', \'glyphicon glyphicon-triangle-bottom\': ' + COLUMN_FIELD + '.' + config.sortField + ' === \'desc\' }'
                });

                _th.append(_spanContent).append(' ').append(_spanIcon);

                return _th;
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