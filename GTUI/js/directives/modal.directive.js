(function ($) {
    if (window.angular) {
        var gta = angular.module('gtui');

        gta.directive('gtuiModal', function (_$utils) {
            var _BUTTON_HTML = '<button></button>',
                _DIV_HTML = '<div></div>';

            var defaultConfig = function () {
                return { };
            }();

            var _getTemplate = function (el, config) {
                var _template = [],
                    _modalId = _$utils.uuid(),
                    _titleId = _$utils.uuid();

                _template.push('<div class="modal fade" tabindex="-1" role="dialog">');
                _template.push('  <div class="modal-dialog modal-lg" role="document">');
                _template.push('    <div class="modal-content">');
                _template.push('      <div class="modal-header">');
                _template.push('        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
                _template.push('        <div class="modal-title h4"></div>');
                _template.push('      </div>');
                _template.push('    <div class="modal-body">');
                _template.push('    </div>');
                _template.push('    <div class="modal-footer">');
                //_template.push('      <button type="button" class="btn btn-sm" ></button>');
                _template.push('    </div>');
                _template.push('  </div>');
                _template.push('</div>');

                var _temp$ = $(_template.join('')).attr({ 'id': _modalId, 'aria-labelledby': _titleId });

                _temp$.find('.modal-title').attr('id', _titleId).html(el.children('.modal-title').html());
                _temp$.find('.modal-body').html(el.children('.modal-body').html());

                return _temp$.prop('outerHTML');
            };

            return {
                restrict: "EA",
                scope: false,
                template: function (element, attrs) {
                    var _config = _$utils.getConfig(attrs);

                    $.extend(defaultConfig, _config, true);

                    return _getTemplate(element, _config);
                },
                replace: true,
                transclude: false,
                link: function (scope, element, attrs) {
                    var _config = _$utils.getConfig(attrs),
                        _trigger = $(_config.trigger),
                        _id = element.attr('id');

                    _trigger.on('click', element, function (e) {
                        e.data.modal('show')
                    });

                    $(document).ready(function () {
                        element.modal({
                            backdrop: 'static',
                            show: false
                        });
                    });

                    _$utils.getScope(scope, _config).metaModal = element;

                    var _buttonConfig = _$utils.getFieldValueByName(scope, _config, 'actions'),
                        _footer = element.find('.modal-footer');
                    for (var i = 0, length = _buttonConfig.length; i < length; i++) {
                        var _button = $(_BUTTON_HTML).addClass('btn btn-sm').attr('type', 'button').html(_buttonConfig[i].content);

                        if (_buttonConfig[i].type === 'close') _button.attr('data-dismiss', 'modal');
                        if (_buttonConfig[i].type === 'primary') _button.addClass('btn-primary');
                        else _button.addClass('btn-default');

                        _footer.append(_button);
                    }

                    element.on('click', '.modal-footer button', { config: _config, scope: scope, btnConfig: _buttonConfig, modal: element }, function (e) {
                        var _target = $(e.target).closest('button'),
                            _index = _target.index(),
                            _btnConfig = e.data.btnConfig,
                            _scope = e.data.scope,
                            _config = e.data.config,
                            _click = _btnConfig[_index].click;

                        if (_click) {
                            if (typeof (_click) !== 'function') {
                                _click = _$utils.getValueByName(_scope, _config, _click);
                            }

                            var _closeFlag = _click.apply(this, [e]);

                            if (_closeFlag) e.data.modal.modal('hide');
                        }
                    });

                    element.on('show.gtui.modal', scope, function (e) {
                        e.data.$emit('show.gtui.modal', e);
                    });
                }
            };
        });
    }
})(jQuery);