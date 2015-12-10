'use strict';

/**
 * @ngdoc directive
 * @name wipHeaderRow
 * @author Martijn van Lune <info@lunar-consultancy.com>
 * @copyright Lunar Consultancy 2015
 * @license GNU General Public License v2.0
 */
angular.module('jiraWallboardApp')
  .directive('wipHeaderRow', [function () {
    return {
      restrict: 'E',
      replace: true,
      template: '<div class="wip-header-row" ng-show="settings.showWIP">' +
      '  <div class="wip-header-cell">' +
      '    <div class="col" ng-repeat="column in columns" style="width: {{columnWidth}}%">' +
      '      <div class="header" ng-class="wipOverMax(column) ? \'warning\' : \'\'"><span class="total">{{(issues | status:column.statuses).length}}</span><span class="title">{{column.name}}<span class="max" ng-hide="column.max === undefined">&nbsp;Max {{column.max}}</span></span></div>' +
      '    </div>' +
      '  </div>' +
      '</div>',
      link: function () {
      }
    };
  }]);
