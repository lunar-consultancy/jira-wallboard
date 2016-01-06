'use strict';

/**
 * @ngdoc directive
 * @name pauseToggleButton
 * @author Martijn van Lune <info@lunar-consultancy.com>
 * @copyright Lunar Consultancy 2015
 * @license GNU General Public License v2.0
 */
angular.module('jiraWallboardApp')
    .directive('pauseToggleButton', [function () {
        return {
            restrict: 'E',
            replace: true,
            template: '<div class="toggle-button">' +
            '<a ng-click="pause()"><img ng-src="images/{{settings.pauseToggle ? \'play\' : \'pause\'}}.png"  /></a>' +
            '</div>'
        };
    }]);
