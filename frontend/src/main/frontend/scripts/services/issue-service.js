'use strict';

/**
 * @ngdoc service
 * @name issueService
 * @author Martijn van Lune <info@lunar-consultancy.com>
 * @copyright Lunar Consultancy 2015
 * @license GNU General Public License v2.0
 * @description
 *   Service for Jira issue functionality's.
 */
angular.module('jiraWallboardApp')
    .service('issueService', ['$filter', 'config', 'moment', function ($filter, config, moment) {

        /**
         * @param {$scope} $scope
         * @returns {issue[]|*}
         */
        this.getNextTasks = function ($scope) {
            if ($scope.futureIssues.length > 0) {
                return $filter('tasks')($scope.futureIssues[0]);
            }
            return undefined;
        };

        /**
         * @param {issue} story
         * @returns {number}
         */
        this.getDaysInProgressForStory = function (story) {
            var date = moment();
            if (story.fields.resolutiondate !== null) {
                date = moment(story.fields.resolutiondate);
            }
            return date.businessDiff(moment(story.fields.sprint.startDate));
        };

        /**
         * @param {$scope} $scope
         * @returns {number}
         */
        this.getPointsTotal = function ($scope) {
            return getPoints($scope, "Total");
        };

        /**
         * @param {$scope} $scope
         * @returns {number}
         */
        this.getPointsToDo = function ($scope) {
            return getPoints($scope, config.STATUS_TO_DO);
        };

        /**
         * @param {$scope} $scope
         * @returns {number}
         */
        this.getPointsInProgress = function ($scope) {
            return getPoints($scope, config.STATUS_IN_PROGRESS);
        };

        /**
         * @param {$scope} $scope
         * @returns {number}
         */
        this.getPointsDone = function ($scope) {
            return getPoints($scope, config.STATUS_DONE);
        };

        /**
         * @param {$scope} $scope
         * @param {string[]} statuses
         * @returns {number}
         */
        var getPoints = function ($scope, statuses) {
            var result = 0;
            for (var i = 0; i < $scope.issues.length; ++i) {
                var issue = $scope.issues[i];
                if (issue.fields.issuetype !== undefined && issue.fields.issuetype.name === "Story") {
                    var points = issue.fields[$scope.estimationFieldId];
                    if (points !== undefined) {
                        if (statuses === "Total") {
                            result += points;
                        } else if (statuses.indexOf(issue.fields.status.name) > -1) {
                            result += points;
                        }
                    }
                }
            }
            return result;
        };

    }]);