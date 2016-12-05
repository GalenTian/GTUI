if (window.angular) {
    // This file is the first of the files of the angular supported files.
    // So here module will be defined once.
    var gta = angular.module('gtui', []);

    require('./services/gtui.service.js');
    require('./directives/gtui.directive.js');
}