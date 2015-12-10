'use strict';

/**
 * @ngdoc directive
 * @name itemBug
 * @author Martijn van Lune <info@lunar-consultancy.com>
 * @copyright Lunar Consultancy 2015
 * @license GNU General Public License v2.0
 */
angular.module('jiraWallboardApp')
    .directive('itemBug', [function () {
        return {
            restrict: 'E',
            replace: true,
            template: '<div class="item-wrapper bug">' +
            '    <div class="item">' +
            '        <div class="wrapper">' +
            '            <div class="wrapper-content">' +
            '                <div class="icons"><img ng-if="bug.fields.issuetype.iconUrl !== undefined" ng-src="{{bug.fields.issuetype.iconUrl}}"><br><img ng-if="bug.fields.priority.iconUrl !== undefined" ng-src="{{bug.fields.priority.iconUrl}}"></div>' +
            '                <div class="title">{{bug.key}}<br/>{{bug.fields.summary | ellipsis}}</div>' +
            '                <div class="assignee"><img ng-if="bug.fields.assignee.avatarUrls[\'32x32\'] !== undefined" ng-src="{{bug.fields.assignee.avatarUrls[\'32x32\'] + \'&os_username=\' + username + \'&os_password=\' + password}}"></div>' +
            '            </div>' +
            '        </div>' +
            //'        <div class="days">' +
            //'            <div class="days-3">' +
            //'                <div></div>' +
            //'            </div>' +
            //'        </div>' +
            '    </div>' +
            '</div>',
            link: function () {
            }
        };
    }]);
