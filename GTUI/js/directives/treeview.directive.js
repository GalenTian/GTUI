(function ($) {
    if (window.angular) {
        var gta = angular.module('gtui');

        gta.directive('gtuiTreeView', function (_$utils) {
            var _BUTTON_HTML = '<button></button>',
                _DIV_HTML = '<div></div>';

            var defaultConfig = function () {
                return {
                    controllerAs: undefined,
                    itemsField: 'items'
                };
            }();

            var _getTemplate = function (el, config) {
                return '<div></div>';
            };

            var _getChildNodesId = function (nodes) {
                var _ids = [];

                for (var i = 0, length = nodes.length; i < length; i++) {
                    var node = nodes[i];

                    _ids.push(node.nodeId);

                    if (node.nodes) {
                        _ids = _ids.concat(_getChildNodesId(node.nodes));
                    }
                }

                return _ids;
            };
            var _getParentNodesId = function (node, el) {
                var _ids = [],
                    _id = node.parentId;

                if (_id > -1) _ids.push(_id);

                var parentNode = el.treeview('getNode', _id);

                if (parentNode.parentId > -1) _ids = _ids.concat(_getParentNodesId(parentNode, el));

                return _ids;
            };
            var _getSiblingsChecking = function (node, el) {
                var _siblings = el.treeview('getSiblings', node.nodeId);

                for (var i = 0, length = _siblings.length; i < length; i++) {
                    if (!_siblings[i].state.checked) {
                        return false;
                    }
                }

                return true;
            };
            var _getAllCheckedParents = function (node, el) {
                var _ids = [],
                    _parentId = node.parentId;

                if (_parentId > -1 && _getSiblingsChecking(node, el)) {
                    _ids.push(_parentId);

                    _ids = _ids.concat(_getAllCheckedParents(el.treeview('getNode', _parentId), el));
                }

                return _ids;
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
                    var _config = _$utils.getConfig(attrs);

                    $(document).ready(function () {
                        element.treeview({
                            showIcon: false,
                            showCheckbox: true,
                            onNodeChecked: function (e, node) {
                                if (node.nodes) {
                                    $(e.target).treeview('checkNode', [_getChildNodesId(node.nodes), { silence: true }]);
                                }
                                if (node.parentId > -1) {
                                    $(e.target).treeview('checkNode', [_getAllCheckedParents(node, $(e.target)), { silence: true }]);
                                }
                            },
                            onNodeUnchecked: function (e, node) {
                                if (node.nodes) {
                                    $(e.target).treeview('uncheckNode', [_getChildNodesId(node.nodes), { silent: true }]);
                                }
                                if (node.parentId > -1) {
                                    $(e.target).treeview('uncheckNode', [_getParentNodesId(node, $(e.target)), { silent: true }]);
                                }
                            },
                            data: _$utils.getFieldValueByName(scope, _config, 'items')
                        });
                    });
                }
            };
        });
    }
})(jQuery);