'use strict';

/**
 * @ngdoc directive
 * @name wipContentRow
 * @author Martijn van Lune <info@lunar-consultancy.com>
 * @copyright Lunar Consultancy 2015
 * @license GNU General Public License v2.0
 */
angular.module('jiraWallboardApp')
    .directive('wipContentRow', ['$filter', 'config', function ($filter, config) {
        return {
            restrict: 'E',
            replace: true,
            template: '<div class="wip-content-row" ng-show="settings.showWIP">' +
            '  <div class="wip-content-cell">' +
            '    <div class="wip-content-wrapper">' +
            '      <div class="wip-content">' +
            '        <div class="lane-header">Speedlane<span class="lane-total">{{(issues | bugs).length}} issues</span><span class="lane-fold"><img ng-click="settings.speedLaneFolded = !settings.speedLaneFolded" ng-src="images/chevron-{{settings.speedLaneFolded ? \'down\' : \'up\'}}.png"></span></div>' +
            '        <div class="lane">' +
            '          <div class="lane-col" ng-repeat="column in columns" style="width: {{columnWidth}}%" ng-class="wipOverMax(column) ? \'warning\' : \'\'">' +
            '            <div class="lane-col-content" ng-hide="settings.speedLaneFolded"><item-bug ng-repeat="bug in issues | bugs | status:column.statuses"></item-bug></div>' +
            '          </div>' +
            '        </div>' +
            '        <div ng-repeat="story in issues | stories | orderBy:isStoryDone">' +
            '          <div class="lane-header" ng-class="isStoryDone(story) ? \'done\' : \'\'">{{story.key}} - {{story.fields.summary}}<span class="lane-total">{{story.fields.subtasks.length}} issues</span><span class="lane-points">{{story.fields[estimationFieldId] || 0}} storypoints</span><span class="lane-fold"><img ng-click="toggleStoryFolded(story.id)" ng-src="images/chevron-{{isStoryFolded(story.id) ? \'down\' : \'up\'}}.png"></span></div>' +
            '          <div class="lane">' +
            '            <div class="lane-col" ng-repeat="column in columns" style="width: {{columnWidth}}%" ng-class="wipOverMax(column) ? \'warning\' : \'\'">' +
            '              <div class="lane-col-content"><item-sub-task ng-hide="isStoryFolded(story.id)" ng-repeat="subTask in story.fields.subtasks | status:column.statuses | notOnHold">{{subTask.key}}</item-sub-task></div>' +
            '            </div>' +
            '          </div>' +
            '        </div>' +
            '        <div class="lane-header">Other<span class="lane-total">{{(issues | tasks).length}} issues</span><span class="lane-fold"><img ng-click="settings.otherFolded = !settings.otherFolded" ng-src="images/chevron-{{settings.otherFolded ? \'down\' : \'up\'}}.png"></span></div>' +
            '        <div class="lane">' +
            '          <div class="lane-col" ng-repeat="column in columns" style="width: {{columnWidth}}%" ng-class="wipOverMax(column) ? \'warning\' : \'\'">' +
            '            <div class="lane-col-content" ng-hide="settings.otherFolded"><item-task ng-repeat="task in issues | tasks | status:column.statuses">{{task.key}}</item-task></div>' +
            '          </div>' +
            '        </div>' +
            '      </div>' +
            //'    </div>' +
            '  </div>' +
            '</div>',
            link: function ($scope) {

                $scope.isStoryDone = function (story) {
                    return config.STATUS_DONE.indexOf(story.fields.status.name) > -1;
                };

                $scope.isStoryFolded = function (id) {
                    var folded = $filter('id')($scope.settings.storiesFolded, id);
                    if (folded !== undefined) {
                        return folded.folded;
                    }
                    return false;
                };

                $scope.toggleStoryFolded = function (id) {
                    var storyFolded = $filter('id')($scope.settings.storiesFolded, id);
                    if (storyFolded !== undefined) {
                        storyFolded.folded = !storyFolded.folded;
                    } else {
                        $scope.settings.storiesFolded.push({"id": id, "folded": true});
                    }
                };
            }
        };
    }])
;
