(function ($) {
    if (window.angular) {
        var gta = angular.module('gtui'),

            _DIV_HTML = '<div></div>',
            _UL_HTML = '<ul></ul>',
            _LI_HTML = '<li></li>',
            _A_HTML = '<a></a>',
            _SPAN_HTML = '<span></span>',

            _FIRST_CLASS = 'glyphicon glyphicon-step-backward',
            _PREVIOUS_GOUP_CLASS = 'glyphicon glyphicon-backward',
            _PREVIOUS_CLASS = 'glyphicon glyphicon-triangle-left',
            _NEXT_CLASS = 'glyphicon glyphicon-triangle-right',
            _NEXT_GROUP_CLASS = 'glyphicon glyphicon-forward',
            _LAST_CLASS = 'glyphicon glyphicon-step-forward',

            ICON_CLASS = 'glyphicon',
                
            _MAX_PAGES = 9;

        gta.directive('gtuiPager', function (_$utils) {

            var _getTemplate = function (el, config) {
                // Template outer element
                var _div = $(_DIV_HTML);

                var _ul = $(_UL_HTML).addClass('pagination');

                var _firstLi = $(_LI_HTML).append($(_A_HTML).attr('href', 'javascript: void(0);').append($(_SPAN_HTML).addClass(_FIRST_CLASS)));
                var _prevGoupLi = $(_LI_HTML).append($(_A_HTML).attr('href', 'javascript: void(0);').append($(_SPAN_HTML).addClass(_PREVIOUS_GOUP_CLASS)));
                var _prevLi = $(_LI_HTML).append($(_A_HTML).attr('href', 'javascript: void(0);').append($(_SPAN_HTML).addClass(_PREVIOUS_CLASS)));

                var _itemsLi = $(_LI_HTML).attr({
                    'ng-repeat': '__item__ in ' + (config.converAs ? config.converAs + '.__pager__.__items__' : '__pager__.__items__'),
                    'ng-class': '{ active: __item__ === ' + config.convertAs + '.' + config.selectedField + ' }'
                })
                    .append($(_A_HTML).attr({ 'ng-bind': '__item__', 'href': 'javascript: void(0);' }));

                var _nextLi = $(_LI_HTML).append($(_A_HTML).attr('href', 'javascript: void(0);').append($(_SPAN_HTML).addClass(_NEXT_CLASS)));
                var _nextGoupLi = $(_LI_HTML).append($(_A_HTML).attr('href', 'javascript: void(0);').append($(_SPAN_HTML).addClass(_NEXT_GROUP_CLASS)));
                var _latLi = $(_LI_HTML).append($(_A_HTML).attr('href', 'javascript: void(0);').append($(_SPAN_HTML).addClass(_LAST_CLASS)));

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

            /**
             * 根据selectedPage与totalPages两个参数生成能够显示的可选页集合。
             * selectedPage: 当前选中页
             * totalPages: 当前总页数
             */
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

            /**
             * 该事件会在该控件中的a标签的click事件触发。
             * 在该事件中，会更新当前的选中页。进而，会触发selectedField的$watch事件。
             */
            var _itemClick = function (e) {
                var _$target = $(e.target),
                    _el = _$target.closest('.' + ICON_CLASS),
                    _config = e.data.scope().$eval(e.data.attr('data-config')),
                    _scope = e.data.scope(),
                    _vm = _scope[_config.convertAs];

                _vm = _vm ? _vm : _scope;

                if (!_el[0]) {
                    _el = _$target.find('.' + ICON_CLASS);

                    if (!_el[0]) {
                        _el = _$target.closest('a')
                    }
                }

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

            /**
             * 该事件会在selectedField或totalField所对应的scope属性变化时调用。
             * 在该方法中，会更新__items__属性中的值，也就是当前需要显示的页数信息（数字）。
             */
            var _changed = function (config) {
                return function (newValue, oldValue, scope) {
                    if (newValue !== oldValue) {
                        var _scope = config.converAs ? scope[config.converAs] : scope;

                        _scope.__pager__.__items__ = _getPages(_$utils.getFieledValueByName(scope, config, 'selected'),
                            _$utils.getFieledValueByName(scope, config, 'total'));
                    }
                }
            };

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
                        var _config = _$utils.getConfig(attrs);
                    }

                    return _getTemplate(element, _config);
                },
                replace: true,
                transclude: false,
                link: function (scope, element, attrs) {
                    var _config = _$utils.getConfig(attrs),
                        _scope = scope;

                    var _selectedIndex = _$utils.getFieledValueByName(scope, _config, 'selected');
                    var _total = _$utils.getFieledValueByName(scope, _config, 'total');
                    _scope.__pager__ = {};
                    _scope.__pager__.__items__ = _getPages(_selectedIndex, _total);
                    _scope.__pager__.__config__ = _config;

                    element.on('click', 'a', element, _itemClick);

                    scope.$watch(_$utils.getFieledStringByName( _config, 'selected') + ' + ' +
                        _$utils.getFieledStringByName(_config, 'total'),
                        _changed(_config));
                }
            };
        });
    }
})(jQuery);