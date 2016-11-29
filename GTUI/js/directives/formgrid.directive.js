(function ($) {
    if (window.angular) {
        var gta = angular.module('gtui');

        gta.directive('gtuiFormGrid', function (_$utils, _$echart) {
            var DIV = '<div></div>',
                COL_CETNER_FIRST_CLASS = 'col-lg-offset-2',
                COL_CETNER_CLASS = 'col-lg-4 col-md-6',
                COL_BASE_CLASS = 'col-sm-6';

            var _getTemplate = function (config, el) {
                var _outerDiv = $(DIV).addClass('form-horizontal');;

                var _groups$ = el.children('[gtui-form-group], gtui-form-group, .gtui-form-group'),
                    _row$;

                for (var i = 0, groupLength = _groups$.length; i < groupLength; i++) {
                    if (i > 0) _outerDiv.append('<hr />');

                    var _group$ = $(_groups$[i]),
                        _items$ = _group$.children('[gtui-form-item], gtui-form-item, .gtui-form-item');

                    _row$ = $(DIV).addClass('row');

                    for (var j = 0, itemsLength = _items$.length; j < itemsLength; j++) {
                        var _col$ = $(DIV).addClass(COL_BASE_CLASS);
                        if (config.display.toLowerCase() === 'center') {
                            _col$.addClass(COL_CETNER_CLASS);
                            if (j % 2 === 0) _col$.addClass(COL_CETNER_FIRST_CLASS);
                        }

                        _row$.append(_col$.append(_items$[j].innerHTML));

                        if (j % 2 === 1) {
                            _outerDiv.append(_row$);
                            _row$ = $(DIV).addClass('row');
                        }
                    }

                    _outerDiv.append(_row$);
                }

                return _outerDiv[0].outerHTML;
            };

            return {
                restrict: 'EA',
                template: function (element, attrs) {
                    var _config = _$utils.getConfig(attrs);

                    if (!_config) throw('gtui-form-grid: data-config is undefined.');

                    return _getTemplate(_config, element);
                },
                replace: true,
                link: function link(scope, element, attrs) {
                    var _config = _$utils.getConfig(attrs);


                }
            };
        });
    }
})(jQuery);