(function ($) {
    if (window.angular) {
        var gta = angular.module('gtui'),

            _DATA_CONFIG_FIELD = 'pager-config',
            _DIV_HTML = '<div></div>',
            _UL_HTML = '<ul></ul>',
            _LI_HTML = '<li></li>',
            _A_HTML = '<a></a>',

            _FIRST_CLASS = 'glyphicon glyphicon-step-backward',
            _PREVIOUS_GOUP_CLASS = 'glyphicon glyphicon-backward',
            _PREVIOUS_CLASS = 'glyphicon glyphicon-triangle-left',
            _NEXT_CLASS = 'glyphicon glyphicon-triangle-right',
            _NEXT_GROUP_CLASS = 'glyphicon glyphicon-forward',
            _LAST_CLASS = 'glyphicon glyphicon-step-forward',
                
            _MAX_PAGES = 9;

        var _getTemplate = function (el, config) {
            // Template outer element
            var _div = $(_DIV_HTML);

            var _ul = $(_UL_HTML).addClass('pagination');

            var _firstLi = $(_LI_HTML).append($(_A_HTML).addClass(_FIRST_CLASS).attr('href', 'javascript: void(0);'));
            var _prevGoupLi = $(_LI_HTML).append($(_A_HTML).addClass(_PREVIOUS_GOUP_CLASS).attr('href', 'javascript: void(0);'));
            var _prevLi = $(_LI_HTML).append($(_A_HTML).addClass(_PREVIOUS_CLASS).attr('href', 'javascript: void(0);'));

            var _itemsLi = $(_LI_HTML).attr({
                    'ng-repeat': '__item__ in ' + (config.vm ? config.vm + '.__pager__.__items__' : '__pager__.__items__'),
                    'ng-class': '{ active: __item__ === ' + config.vm + '.' + config.selectedField + ' }'
                })
                .append($(_A_HTML).attr({ 'ng-bind': '__item__', 'href': 'javascript: void(0);' }));

            var _nextLi = $(_LI_HTML).append($(_A_HTML).addClass(_NEXT_CLASS).attr('href', 'javascript: void(0);'));
            var _nextGoupLi = $(_LI_HTML).append($(_A_HTML).addClass(_NEXT_GROUP_CLASS).attr('href', 'javascript: void(0);'));
            var _latLi = $(_LI_HTML).append($(_A_HTML).addClass(_LAST_CLASS).attr('href', 'javascript: void(0);'));

            _div.append(
                _ul.append(_firstLi)
                    .append(_prevGoupLi)
                    .append(_prevLi)
                    .append(_itemsLi)
                    .append(_nextLi)
                    .append(_nextGoupLi)
                    .append(_latLi)
            );

            return _div.prop('outerHTML');
        };
        var _getPages = function (selectedPage, totalPages) {
            if ((typeof (selectedPage) === 'undefined' || isNaN(selectedPage)) || (typeof (totalPages) === 'undefined' || isNaN(totalPages))) {
                console.error('Pager directive: Make sure the selcted page and total pages are existed and they are numbers. ');
            }

            var _maxPage = _MAX_PAGES,
                _half = parseInt(_maxPage / 2),
                _startPage, _endPage,
                _items = [];

            _endPage = selectedPage + _half > totalPages ? totalPages : selectedPage + _half;
            _startPage = _endPage - _maxPage + 1;
            _startPage = _startPage < 1 ? 1 : _startPage;
            _endPage = _startPage + _maxPage - 1 > totalPages ? totalPages : _startPage + _maxPage - 1;

            while (_startPage <= _endPage) {
                _items.push(_startPage);
                _startPage++;
            }

            return _items;
        };

        var _itemClick = function (e) {
            var _el = gtui.utils.getClosestEementByNodeName(e.target, 'a'),
                _config = e.data.data(_DATA_CONFIG_FIELD),
                _scope = e.data.scope(),
                _vm = _scope[_config.vm];

            _vm = _vm ? _vm : _scope;

            if (_el.hasClass(_FIRST_CLASS)) {
                _vm[_config.selectedField] = 1;
            }
            else if (_el.hasClass(_PREVIOUS_GOUP_CLASS)) {
                if (_vm[_config.selectedField] > _MAX_PAGES) {
                    _vm[_config.selectedField] = _vm[_config.selectedField] - _MAX_PAGES;
                }
            }
            else if (_el.hasClass(_PREVIOUS_CLASS)) {
                if (_vm[_config.selectedField] !== 1) {
                    _vm[_config.selectedField]--;
                }
            }
            else if (_el.hasClass(_NEXT_CLASS)) {
                if (_vm[_config.selectedField] !== _vm[_config.totalField]) {
                    _vm[_config.selectedField]++;
                }
            }
            else if (_el.hasClass(_NEXT_GROUP_CLASS)) {
                if (_vm[_config.selectedField] <= _vm[_config.totalField] - _MAX_PAGES) {
                    _vm[_config.selectedField] = _vm[_config.selectedField] + _MAX_PAGES;
                }
            }
            else if (_el.hasClass(_LAST_CLASS)) {
                _vm[_config.selectedField] = _vm[_config.totalField];
            }
            else {
                _vm[_config.selectedField] = parseInt(_el.text());
            }
            _scope.$apply();
        };
        var _changed = function (config) {
            return function (newValue, oldValue, scope) {
                if (newValue !== oldValue) {
                    var _scope = config.vm ? scope[config.vm] : scope;

                    _scope.__pager__.__items__ = _getPages(_scope[config.selectedField], _scope[config.totalField]);
                }
            }
        };

        gta.directive('gtuiPager', function ($compile, $timeout) {
            return {
                restrict: "EA",
                scope: false,
                template: function (element, attrs) {
                    // Deal with data-config
                    if (!attrs.config) {
                        console.error('gtui-pager: "data-config" attribute is missing.');
                        return _DIV_HTML;
                    }
                    else {
                        var _config = gtui.utils.parseObj(attrs.config);
                        element.data(_DATA_CONFIG_FIELD, _config);
                    }

                    return _getTemplate(element, _config);
                },
                replace: true,
                transclude: false,
                link: function (scope, element, attrs) {
                    var _config = element.data(_DATA_CONFIG_FIELD),
                        _scope = scope;

                    if (_config.vm) {
                        _scope = _scope[_config.vm];
                    }

                    var _selectedIndex = _scope[_config.selectedField];
                    var _total = _scope[_config.totalField];
                    _scope.__pager__ = {};
                    _scope.__pager__.__items__ = _getPages(_selectedIndex, _total);
                    _scope.__pager__.__config__ = _config;

                    element.on('click', 'a', element, _itemClick);

                    scope.$watch((_config.vm ? (_config.vm + '.') : '') + _config.selectedField + ' + ' +
                        (_config.vm ? (_config.vm + '.') : '') + _config.totalField, _changed(_config));
                }
            };
        });
    }
})(jQuery);