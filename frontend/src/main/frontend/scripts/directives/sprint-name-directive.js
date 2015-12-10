'use strict';

/**
 * @ngdoc directive
 * @name sprintName
 * @author Martijn van Lune <info@lunar-consultancy.com>
 * @copyright Lunar Consultancy 2015
 * @license GNU General Public License v2.0
 */
angular.module('jiraWallboardApp')
    .directive('sprintName', [function () {
        return {
            restrict: 'E',
            replace: true,
            template: '<div class="name">{{activeSprint.name}}</div>'
        };
    }]);
