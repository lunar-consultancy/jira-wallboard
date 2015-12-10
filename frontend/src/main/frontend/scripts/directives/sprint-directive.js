'use strict';

/**
 * @ngdoc directive
 * @name sprint
 * @author Martijn van Lune <info@lunar-consultancy.com>
 * @copyright Lunar Consultancy 2015
 * @license GNU General Public License v2.0
 */
angular.module('jiraWallboardApp')
  .directive('sprint', [function () {
    return {
      restrict: 'E',
      replace: true,
      template: '<div class="sprint">' +
      '  <sprint-name></sprint-name>' +
      '  <sprint-metrics></sprint-metrics>' +
      '  <toggle-button></toggle-button>' +
      '  <pause-toggle-button></pause-toggle-button>' +
      '  <sprint-progress></sprint-progress>' +
      '</div>',
      link: function () {
      }
    };
  }]);
