'use strict';

/**
 * @ngdoc directive
 * @name wipFooterRow
 * @author Martijn van Lune <info@lunar-consultancy.com>
 * @copyright Lunar Consultancy 2015
 * @license GNU General Public License v2.0
 */
angular.module('jiraWallboardApp')
    .directive('wipFooterRow', [function () {
        return {
            restrict: 'E',
            replace: true,
            template: '<div class="wip-footer-row">' +
            '  <div class="wip-footer-cell">' +
            '    <div class="col" style="width: 25%">' +
            '      <div class="header" ng-class="getImpededCount() > 0 ? \'warning\' : \'\'"><span class="total">{{getImpededCount() || 0}}</span><span class="title">Impediments</span></div>' +
            '    </div>' +
            '    <div class="col" style="width: 25%">' +
            '      <div class="header" ng-class="getOnHoldCount() > 0 ? \'warning\' : \'\'"><span class="total">{{getOnHoldCount() || 0}}</span><span class="title">On Hold</span></div>' +
            '    </div>' +
            '    <div class="col" style="width: 25%">' +
            '      <div class="header" ng-class="getNextCount() > 0 ? \'info\' : \'\'"><span class="total">{{getNextCount() || 0}}</span><span class="title">Next</span></div>' +
            '    </div>' +
            '    <div class="col" style="width: 25%">' +
            '      <div class="header" ng-class="getUnplannedCount() > 0 ? \'info\' : \'\'"><span class="total">{{getUnplannedCount() || 0}}</span><span class="title">Unplanned</span></div>' +
            '    </div>' +
            '    <div class="lane">' +
            '      <div class="lane-col" style="width:25%">' +
            '        <div class="lane-col-content"><item-bug ng-repeat="bug in impededBugs"></item-bug><item-story ng-repeat="story in impededStories"></item-story><item-sub-task ng-repeat="subTask in impededSubTasks"></item-sub-task><item-task ng-repeat="task in impededTasks"></item-task></div>' +
            '      </div>' +
            '      <div class="lane-col" style="width:25%">' +
            '        <div class="lane-col-content"><item-bug ng-repeat="bug in onHoldBugs"></item-bug><item-story ng-repeat="story in onHoldStories"></item-story><item-sub-task ng-repeat="subTask in onHoldSubTasks"></item-sub-task><item-task ng-repeat="task in onHoldTasks"></item-task></div>' +
            '      </div>' +
            '      <div class="lane-col" style="width:25%">' +
            '        <div class="lane-col-content"><item-task ng-repeat="task in next"></item-task></div>' +
            '      </div>' +
            '      <div class="lane-col" style="width:25%">' +
            '        <div class="lane-col-content"><item-task ng-repeat="task in unplanned"></item-task></div>' +
            '      </div>' +
            '    </div>' +
            '  </div>' +
            '</div>',
            link: function ($scope) {

                $scope.getImpededCount = function () {
                    return getCount($scope.impededBugs) +
                        getCount($scope.impededStories) +
                        getCount($scope.impededSubTasks) +
                        getCount($scope.impededTasks);
                };

                $scope.getOnHoldCount = function () {
                    return getCount($scope.onHoldBugs) +
                        getCount($scope.onHoldStories) +
                        getCount($scope.onHoldSubTasks) +
                        getCount($scope.onHoldTasks);
                };

                $scope.getNextCount = function () {
                    return getCount($scope.next);
                };

                $scope.getUnplannedCount = function () {
                    return getCount($scope.unplanned);
                };

                var getCount = function (item) {
                    if (item !== undefined) {
                        return item.length;
                    }
                    return 0;
                };
            }
        };
    }]);
