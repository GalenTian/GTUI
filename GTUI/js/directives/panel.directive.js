(function ($) {
    if (window.angular) {
        var gta = angular.module('gtui');

        gta.directive('gtuiPanelSearch', function ($parse) {
            return {
                restrict: "EA",
                scope: false,
                template: function (element, attrs) {
                    // Deal with data-config
                    if (!attrs.config) {
                        console.error('gtui-table: "data-config" attribute is missing.');
                        return _divHTML;
                    }
                    else {
                        var _config = $parse(attrs.config)();
                    }

                    var _template = [];

                    _template.push('<div class="panel panel-primary">');
                    _template.push('  <div class="panel-heading">');
                    _template.push('    <span class="glyphicon glyphicon-chevron-up"></span>');
                    _template.push('    {{' + (_config.controllerAs ? _config.controllerAs + '.' : '') + _config.titleField + '}}');
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
                        //e.data.find('> .panel-heading > .glyphicon').toggleClass('glyphicon-chevron-down');
                        //e.data.children('.panel-body').toggle();
                    });
                }
            };
        });

        gta.directive('gtuiPanelContent', function ($parse) {
            return {
                restrict: "EA",
                scope: false,
                template: function (element, attrs) {
                    // Deal with data-config
                    if (!attrs.config) {
                        console.error('gtui-table: "data-config" attribute is missing.');
                        return _divHTML;
                    }
                    else {
                        var _config = $parse(attrs.config)();
                    }

                    var _template = [];

                    _template.push('<div class="panel panel-primary">');
                    _template.push('  <div class="panel-heading"></div>');
                    _template.push('  <div class="panel-body" ng-transclude></div>');
                    if (_config.hasFooter) {
                        _template.push('  <div class="panel-footer"></div>');
                    }
                    _template.push('</div>');

                    return _template.join('');
                },
                replace: true,
                transclude: true,
                link: function (scope, element, attrs) {
                    
                }
            };
        });

        gta.directive('gtuiPanelTable', function ($parse) {
            return {
                restrict: "EA",
                scope: false,
                template: function (element, attrs) {
                    // Deal with data-config
                    if (!attrs.config) {
                        console.error('gtui-table: "data-config" attribute is missing.');
                        return _divHTML;
                    }
                    else {
                        var _config = $parse(attrs.config)();
                    }

                    var _template = [];

                    _template.push('<div class="panel panel-primary">');
                    _template.push('  <div class="panel-heading"></div>');
                    _template.push('  <div class="panel-table" ng-transclude></div>');
                    _template.push('  <div class="panel-footer"></div>');
                    _template.push('</div>');

                    return _template.join('');
                },
                replace: true,
                transclude: true,
                link: function (scope, element, attrs) {

                }
            };
        });
    }
})(jQuery);