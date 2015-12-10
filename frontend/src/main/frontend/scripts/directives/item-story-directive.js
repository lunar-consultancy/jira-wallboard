'use strict';

/**
 * @ngdoc directive
 * @name itemStory
 * @author Martijn van Lune <info@lunar-consultancy.com>
 * @copyright Lunar Consultancy 2015
 * @license GNU General Public License v2.0
 */
angular.module('jiraWallboardApp')
    .directive('itemStory', [function () {
        return {
            restrict: 'E',
            replace: true,
            template: '<div class="item-wrapper story">' +
            '    <div class="item">' +
            '        <div class="wrapper">' +
            '            <div class="wrapper-content">' +
            '                <div class="icons"><img ng-if="story.fields.issuetype.iconUrl !== undefined" ng-src="{{story.fields.issuetype.iconUrl}}"><br><img ng-if="story.fields.priority.iconUrl !== undefined" ng-src="{{story.fields.priority.iconUrl}}"></div>' +
            '                <div class="title">{{story.key}}<br/>{{story.fields.summary | ellipsis}}</div>' +
            '                <div class="assignee"><img ng-if="story.fields.assignee.avatarUrls[\'32x32\'] !== undefined" ng-src="{{story.fields.assignee.avatarUrls[\'32x32\'] + \'&os_username=\' + username + \'&os_password=\' + password}}"></div>' +
            '            </div>' +
            '        </div>' +
            '        <div class="wrapper">' +
            '            <div class="wrapper-content">' +
            '                <div class="highlights">' +
            '                    <div class="highlight" ng-hide="story.fields.epic === undefined">' +
            '                        <span class="label">{{story.fields.epic !== undefined ? story.fields.epic.name : \'\'}}</span>' +
            '                    </div>' +
            '                </div>' +
            '                <div class="badge-wrapper">' +
            '                    <div class="badge">{{story.fields[estimationFieldId] || 0}}</div>' +
            '                </div>' +
            '            </div>' +
            '        </div>' +
            //'        <div class="days">' +
            //'            <div class="days-{{getDaysInProgressForStory(story) || 0}}">' +
            //'                <div></div>' +
            //'            </div>' +
            //'        </div>' +
            '    </div>' +
            '</div>',
            link: function () {
            }
        };
    }]);
