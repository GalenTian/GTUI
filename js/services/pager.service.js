(function ($) {
    if (window.angular) {
        var gta = angular.module('gtui');

        gta.service('_$pager', function ($parse) {
            var _serv = {
                getPageCount: function (itemsCount, displayCount) {
                    return Math.ceil(itemsCount / displayCount);
                }
            }

            return _serv;
        });
    }
})(jQuery);