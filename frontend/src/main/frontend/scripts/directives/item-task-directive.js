'use strict';

/**
 * @ngdoc directive
 * @name itemTask
 * @author Martijn van Lune <info@lunar-consultancy.com>
 * @copyright Lunar Consultancy 2015
 * @license GNU General Public License v2.0
 */
angular.module('jiraWallboardApp')
    .directive('itemTask', [function () {
        return {
            restrict: 'E',
            replace: true,
            template: '<div class="item-wrapper task">' +
            '    <div class="item">' +
            '        <div class="wrapper">' +
            '            <div class="wrapper-content">' +
            '                <div class="icons"><img ng-if="task.fields.issuetype.iconUrl !== undefined" ng-src="{{task.fields.issuetype.iconUrl}}"><br><img ng-if="task.fields.priority.iconUrl !== undefined" ng-src="{{task.fields.priority.iconUrl}}"></div>' +
            '                <div class="title">{{task.key}}<br/>{{task.fields.summary | ellipsis}}</div>' +
            '                <div class="assignee"><img ng-if="task.fields.assignee.avatarUrls[\'32x32\'] !== undefined" ng-src="{{task.fields.assignee.avatarUrls[\'32x32\'] + \'&os_username=\' + username + \'&os_password=\' + password}}"></div>' +
            '            </div>' +
            '        </div>' +
            //'        <div class="days">' +
            //'            <div class="days-5">' +
            //'                <div></div>' +
            //'            </div>' +
            //'        </div>' +
            '    </div>' +
            '</div>',
            link: function () {
            }
        };
    }]);
