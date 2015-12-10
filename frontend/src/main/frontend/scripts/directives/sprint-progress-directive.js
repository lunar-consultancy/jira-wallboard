'use strict';

/**
 * @ngdoc directive
 * @name sprintProgress
 * @author Martijn van Lune <info@lunar-consultancy.com>
 * @copyright Lunar Consultancy 2015
 * @license GNU General Public License v2.0
 */
angular.module('jiraWallboardApp')
    .directive('sprintProgress', [function () {
        return {
            restrict: 'E',
            replace: true,
            template: '<div class="progress">' +
            '  <div class="bar">' +
            '    <div class="done" style="height:{{getHeight(pointsDone)}}%" ng-hide="shouldHide(pointsDone)">' +
            '      <div>{{pointsDone}}</div>' +
            '    </div>' +
            '    <div class="in-progress" style="height:{{getHeight(pointsInProgress)}}%" ng-hide="shouldHide(pointsInProgress)">' +
            '      <div>{{pointsInProgress}}</div>' +
            '    </div>' +
            '    <div class="todo" style="height:{{getHeight(pointsToDo)}}%" ng-hide="shouldHide(pointsToDo)">' +
            '      <div>{{pointsToDo}}</div>' +
            '    </div>' +
            '  </div>' +
            '</div>',
            link: function ($scope) {
                $scope.shouldHide = function (points) {
                    return points === 0;
                };
                $scope.getHeight = function (points) {
                    return points * 100 / $scope.pointsTotal;
                };
            }
        };
    }]);
