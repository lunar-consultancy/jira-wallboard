'use strict';

/**
 * @ngdoc directive
 * @name itemSubTask
 * @author Martijn van Lune <info@lunar-consultancy.com>
 * @copyright Lunar Consultancy 2015
 * @license GNU General Public License v2.0
 */
angular.module('jiraWallboardApp')
    .directive('itemSubTask', [function () {
        return {
            restrict: 'E',
            replace: true,
            template: '<div class="item-wrapper sub-task">' +
            '    <div class="item">' +
            '        <div class="wrapper">' +
            '            <div class="wrapper-content">' +
            '                <div class="icons"><img ng-if="subTask.fields.issuetype.iconUrl !== undefined" ng-src="{{subTask.fields.issuetype.iconUrl}}"><br><img ng-if="subTask.fields.priority.iconUrl !== undefined" ng-src="{{subTask.fields.priority.iconUrl}}"></div>' +
            '                <div class="title">{{subTask.fields.summary | ellipsis}}</div>' +
            '                <div class="assignee"><img ng-if="(issues|id:subTask.id).fields.assignee.avatarUrls[\'32x32\'] !== undefined" ng-src="{{(issues|id:subTask.id).fields.assignee.avatarUrls[\'32x32\'] + \'&os_username=\' + username + \'&os_password=\' + password}}"></div>' +
            '            </div>' +
            '        </div>' +
            //'        <div class="days">' +
            //'            <div class="days-4">' +
            //'                <div></div>' +
            //'            </div>' +
            //'        </div>' +
            '    </div>' +
            '</div>',
            link: function () {
            }
        };
    }]);
