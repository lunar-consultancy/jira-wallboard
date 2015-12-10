'use strict';

/**
 * @ngdoc directive
 * @name toggleButton
 * @author Martijn van Lune <info@lunar-consultancy.com>
 * @copyright Lunar Consultancy 2015
 * @license GNU General Public License v2.0
 */
angular.module('jiraWallboardApp')
    .directive('toggleButton', [function () {
        return {
            restrict: 'E',
            replace: true,
            template: '<div class="toggle-button">' +
            '<a ng-click="toggle()"><img ng-src="images/{{settings.showWIP ? \'overview\' : \'wip\'}}.png"  /></a>' +
            '</div>'
        };
    }]);
