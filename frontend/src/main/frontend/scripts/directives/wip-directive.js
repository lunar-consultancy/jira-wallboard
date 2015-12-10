'use strict';

/**
 * @ngdoc directive
 * @name wip
 * @author Martijn van Lune <info@lunar-consultancy.com>
 * @copyright Lunar Consultancy 2015
 * @license GNU General Public License v2.0
 */
angular.module('jiraWallboardApp')
    .directive('wip', [function () {
        return {
            restrict: 'E',
            replace: true,
            template: '<div class="wip">' +
            '  <div class="wip-wrapper">' +
            '    <wip-header-row></wip-header-row>' +
            '    <wip-content-row></wip-content-row>' +
            '    <wip-overview-row></wip-overview-row>' +
            '    <wip-footer-row></wip-footer-row>' +
            '  </div>' +
            '</div>',
            link: function () {
            }
        };
    }]);
