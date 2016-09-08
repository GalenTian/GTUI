(function ($) {
    if (window.angular) {
        angular.module('gtui', []);
    }
})(jQuery);

// Directives
require('./table.directive.js');
require('./table.thead.directive.js');
require('./table.tbody.directive.js');