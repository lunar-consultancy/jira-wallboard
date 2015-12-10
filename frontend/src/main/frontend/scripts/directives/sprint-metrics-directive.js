'use strict';

/**
 * @ngdoc directive
 * @name sprintMetrics
 * @author Martijn van Lune <info@lunar-consultancy.com>
 * @copyright Lunar Consultancy 2015
 * @license GNU General Public License v2.0
 */
angular.module('jiraWallboardApp')
  .directive('sprintMetrics', [function () {
    return {
      restrict: 'E',
      replace: true,
      template: '<div class="metrics">' +
      '  <div>' +
      '    <div class="value empty">{{blocker | ifEmpty:"0":"--"}}</div>' +
      '    <div class="label empty">Blocker</div>' +
      '  </div>' +
      '  <div>' +
      '    <div class="value">{{timeElapsed | ifEmpty:"0":"--"}}<sup ng-hide="timeElapsed === undefined">%</sup></div>' +
      '    <div class="label">Time Elapsed</div>' +
      '  </div>' +
      '  <div>' +
      '    <div class="value">{{workComplete | ifEmpty:"0":"--"}}<sup ng-hide="workComplete === undefined">%</sup></div>' +
      '    <div class="label">Work complete</div>' +
      '  </div>' +
      '  <div ng-hide="true">' +
      '    <div class="value">{{scopeChanged | ifEmpty:"0":"--"}}<sup ng-hide="scopeChanged === undefined">%</sup></div>' +
      '    <div class="label">Scope changed</div>' +
      '  </div>' +
      '  <div>' +
      '    <div class="value">{{daysRemaining | ifEmpty:"0":"--"}}</div>' +
      '    <div class="label">Days Remaining</div>' +
      '  </div>' +
      '</div>',
      link: function () {
      }
    };
  }]);
