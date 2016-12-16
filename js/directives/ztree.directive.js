(function ($) {
    if (window.angular) {
        var _gta = angular.module('gtui');

        var ZTREE_CLASS = 'ztree';

        var _dSetting = function () {
                return {
                    async: {
                        enable: true
                    },
                    view: {
                        showIcon: false,
                        showLine: false
                    },
                    check: {
                        enable: true
                    },
                    data: {
                        key: {
                            name: ''
                        },
                        simpleData: {
                            idKey: '',
                            pIdKey: '',
                            enable: true
                        }
                    },
                    callback: {}
                };
            },
            setSelection = function (setting, type) {
                if (type && type.toLowerCase() === 'radio') {
                    setting.check.chkStyle = 'radio';
                    setting.check.radioType = 'all';
                }
                else {
                    setting.check.chkStyle = 'checkbox';
                }
            },
            setData = function (setting, config) {
                setting.data.key.name = config.contentField;
                setting.data.simpleData.idKey = config.keyField;
                setting.data.simpleData.pIdKey = config.parendKeyField;
            },
            getSelectedNodes = function (treeId) {
                var checkedNodes = $.fn.zTree.getZTreeObj(treeId).getCheckedNodes();

                for (var i = 0; i < checkedNodes.length; i++) {
                    if (checkedNodes[i].check_Child_State === 1) {
                        checkedNodes.splice(i, 1);
                        i--;
                    }
                }

                return checkedNodes;
            };

        _gta.directive('gtuiZtree', function (_$utils) {
            return {
                restrict: "EA",
                template: '',
                link: function (scope, element, attrs) {
                    var _config = _$utils.getConfig(attrs),
                        _setting = _dSetting(),
                        _items = _$utils.getFieldValueByName(scope, _config, 'items');

                    setSelection(_setting, _config.selectionType);
                    setData(_setting, _config);

                    element.addClass(ZTREE_CLASS);
                    
                    if (_items && _items.length > 0)
                        _items[0].open = true;

                    _setting.callback.onCheck = function (e, tId, node) {
                        var selectedItems = getSelectedNodes(tId);

                        _$utils.setPropertyValueByName(scope, _config, 'selectedField', selectedItems);
                        scope.$apply();
                    };

                    $.fn.zTree.init(element, _setting, _items);
                }
            };
        });
    }
})(jQuery);