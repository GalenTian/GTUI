(function ($) {
    if (window.angular) {
        var gta = angular.module('gtui'),
            _DIV = '<div></div>';

        gta.directive('gtuiPanelSearch', function (_$utils) {
            return {
                restrict: "EA",
                scope: false,
                template: function (element, attrs) {
                    // Deal with data-config
                    var _config = _$utils.getConfig(attrs);

                    var _template = [];

                    _template.push('<div class="panel panel-primary">');
                    _template.push('  <div class="panel-heading">');
                    _template.push('    <span class="glyphicon glyphicon-chevron-up"></span>');
                    _template.push('    {{' + _$utils.getFieldStringByName(_config, 'title') + '}}');
                    _template.push('  </div>');
                    _template.push('  <div class="panel-body" ng-transclude>');
                    _template.push('  </div>');
                    _template.push('</div>');

                    return _template.join('');
                },
                replace: true,
                transclude: true,
                link: function (scope, element, attrs) {
                    element.children('.panel-heading').css({ cursor: 'pointer' }).on('click.gtui.panelsearch', element, function (e) {
                        e.data.find('> .panel-heading > .glyphicon').toggleClass('glyphicon-chevron-down');
                        e.data.children('.panel-body').toggle();
                    });
                }
            };
        });

        gta.directive('gtuiPanelContent', function (_$utils) {
            var _getTemplate = function (element, config) {
                var _div$ = $(_DIV).addClass('panel panel-primary'),
                    _headerDiv$ = $(_DIV).addClass('panel-heading'),
                    _contentDiv$ = $(_DIV).addClass('panel-body'),
                    _tableDiv$ = $(_DIV).addClass('panel-table'),
                    _footerDiv$ = $(_DIV).addClass('panel-footer');

                var _headerTemplate = element.children('[gtui-panel-header]'),
                    _contentTemplate = element.children('[gtui-panel-content]'),
                    _tableTemplate = element.children('[gtui-panel-table]'),
                    _footerTemplate = element.children('[gtui-panel-footer]');

                _div$.append(
                        _headerDiv$.append(_headerTemplate.html())
                    )
                if (_contentTemplate.length > 0) {
                    _div$.append(
                        _contentDiv$.append(_contentTemplate.html())
                    )
                }
                if (_tableTemplate.length > 0) {
                    _div$.append(
                        _tableDiv$.append(_tableTemplate.html())
                    );
                }
                if (_footerTemplate.length > 0) {
                    _div$.append(
                        _footerDiv$.append(_footerTemplate.html())
                    );
                }

                return _div$.prop('outerHTML');
            };

            return {
                restrict: "EA",
                scope: false,
                template: function (element, attrs) {
                    var _config = _$utils.getConfig(attrs);

                    return _getTemplate(element, _config);
                },
                replace: true,
                link: function (scope, element, attrs) {
                    
                }
            };
        });
    }
})(jQuery);