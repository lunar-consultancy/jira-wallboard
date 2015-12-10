'use strict';

/**
 * @ngdoc directive
 * @name wipOverviewRow
 * @author Martijn van Lune <info@lunar-consultancy.com>
 * @copyright Lunar Consultancy 2015
 * @license GNU General Public License v2.0
 */
angular.module('jiraWallboardApp')
    .directive('wipOverviewRow', [function () {
        return {
            restrict: 'E',
            replace: true,
            template: '<div class="wip-overview-wrapper-row" ng-hide="settings.showWIP">' +
            '  <div class="wip-overview-wrapper-cell">' +
            '    <div class="wip-overview-wrapper-table">' +
            '      <div class="wip-overview-row">' +
            '        <div class="wip-overview-cell">' +
            '          <div class="wip-overview-content-wrapper">' +
            '            <div class="wip-overview-content">' +
            '              <div class="wip-overview-progress">' +
            '                <div class="col" ng-repeat="column in columns" style="width: {{columnWidth}}%">' +
            '                  <div class="header"><span class="total">{{(issues | stories | status:column.statuses).length}}</span><span class="title">{{column.name}}</span></div>' +
            '                </div>' +
            '              </div>' +
            '              <div class="lane">' +
            '                <div class="lane-col" ng-repeat="column in columns" style="width: {{columnWidth}}%">' +
            '                  <div class="lane-col-content"><item-bug ng-repeat="bug in issues | bugs | status:column.statuses"></item-bug><item-story ng-repeat="story in issues | stories | status:column.statuses"></item-story></div>' +
            '                </div>' +
            '              </div>' +
            '            </div>' +
            '          </div>' +
            '        </div>' +
            '        <div class="wip-overview-chart-cell">' +
            '          <wip-overview-chart></wip-overview-chart>' +
            '        </div>' +
            '      </div>' +
            '    </div>' +
            '  </div>' +
            '</div>'
        };
    }]);
