'use strict';

/**
 * @ngdoc controller
 * @name jiraWallboardApp
 * @author Martijn van Lune <info@lunar-consultancy.com>
 * @copyright Lunar Consultancy 2015
 * @license GNU General Public License v2.0
 * @description
 *   Main controller of the application.
 */
angular.module('jiraWallboardApp')
    .controller('jiraWallboardCtrl', ['$scope', '$interval', '$timeout', '$filter', '$cookies', 'config', 'jsonService', 'issueService', 'moment', function ($scope, $interval, $timeout, $filter, $cookies, config, jsonService, issueService, moment) {

        var toggleTimeout, refreshInterval;

        /**
         * @type {string}
         */
        $scope.username = config.USERNAME;
        /**
         * @type {string}
         */
        $scope.password = config.PASSWORD;

        /**
         * @typedef {{sprint: string, pauseToggle: boolean, showWIP: boolean, speedLaneFolded: boolean, storiesFolded: Array, otherFolded: boolean}} $scope.settings
         * @typedef {board} $scope.board
         * @typedef {column[]} $scope.columns
         * @typedef {number} $scope.columnWidth
         * @typedef {string} $scope.estimationFieldId
         * @typedef {sprint} $scope.activeSprint
         * @typedef {sprint[]} $scope.futureSprints
         * @typedef {issue[]} $scope.backlog
         * @typedef {issue[]} $scope.issues
         * @typedef {issue[]} $scope.futureIssues
         * @typedef {issue[]} $scope.impededBugs
         * @typedef {issue[]} $scope.impededStories
         * @typedef {issue[]} $scope.impededSubTasks
         * @typedef {issue[]} $scope.impededTasks
         * @typedef {issue[]} $scope.onHoldBugs
         * @typedef {issue[]} $scope.onHoldStories
         * @typedef {issue[]} $scope.onHoldSubTasks
         * @typedef {issue[]} $scope.onHoldTasks
         * @typedef {issue[]} $scope.next
         * @typedef {issue[]} $scope.unplanned
         * @typedef {number} $scope.daysRemaining
         * @typedef {number} $scope.timeElapsed
         * @typedef {number} $scope.pointsToDo
         * @typedef {number} $scope.pointsInProgress
         * @typedef {number} $scope.pointsDone
         * @typedef {number} $scope.pointsTotal
         * @typedef {number} $scope.blocker
         */

        var readSettings = function () {

            var settingsString = $cookies.get('settings');
            if (settingsString !== undefined) {
                $scope.settings = JSON.parse(settingsString);
            }
            if ($scope.settings === undefined) {
                $scope.settings = {
                    "sprint": undefined,
                    "pauseToggle": false,
                    "showWIP": true,
                    "speedLaneFolded": false,
                    "storiesFolded": [],
                    "otherFolded": false
                };
            }
        };
        readSettings();

        $scope.toggle = function () {
            $scope.settings.showWIP = !$scope.settings.showWIP;
            $scope.settings.showOverview = !$scope.settings.showOverview;
        };

        var toggle = function () {
            if (!$scope.settings.pauseToggle) {
                $scope.toggle();
            }
            setToggleTimeOut();
        };

        var setToggleTimeOut = function () {
            $timeout.cancel(toggleTimeout);
            if ($scope.settings.showWIP) {
                toggleTimeout = $timeout(toggle, config.TIME_WIP);
            } else {
                toggleTimeout = $timeout(toggle, config.TIME_OVERVIEW);
            }
        };

        $scope.$on('$destroy', function () {
            if (angular.isDefined(toggleTimeout)) {
                $interval.cancel(toggleTimeout);
                toggleTimeout = undefined;
            }
            if (angular.isDefined(refreshInterval)) {
                $interval.cancel(refreshInterval);
                refreshInterval = undefined;
            }
        });

        var refresh = function () {

            if (refreshInterval === undefined) {
                refreshInterval = $interval(refresh, config.REFRESH_INTERVAL);
            }

            jsonService.getBoard(config.BOARD_NAME).then(function (board) {
                $scope.board = board;
                getBoardContents();
            });

            // Reset settings on sprint change
            if ($scope.activeSprint !== undefined && $scope.activeSprint.name !== $scope.settings.sprint) {
                $scope.settings.sprint = $scope.activeSprint.name;
                $scope.settings.speedLaneFolded = false;
                $scope.settings.storiesFolded = [];
                $scope.settings.otherFolded = false;
            }
        };

        var getBoardContents = function () {

            if ($scope.board !== undefined) {
                jsonService.getConfiguration($scope.board).then(function (configuration) {
                    $scope.columns = configuration.columnConfig.columns;
                    $scope.columnWidth = 100 / $scope.columns.length;
                    $scope.estimationFieldId = configuration.estimation.field.fieldId;
                });
                jsonService.getSprints($scope.board).then(function (sprints) {
                    $scope.activeSprint = $filter('activeSprint')(sprints)[0];
                    $scope.futureSprints = $filter('futureSprint')(sprints);
                });
                jsonService.getBacklog($scope.board).then(function (promise) {
                    $scope.backlog = promise;
                });
            }
        };

        $scope.$watch('activeSprint', function () {
            if ($scope.activeSprint !== undefined) {
                jsonService.getIssues($scope.activeSprint).then(function (promise) {
                    $scope.issues = promise;
                });
            }
        });

        $scope.$watch('futureSprints', function () {
            $scope.futureIssues = [];
            if ($scope.futureSprints !== undefined) {
                for (var i = 0; i < $scope.futureSprints.length; i++) {
                    getIssuesForFutureSprint(i);
                }
            }
        });

        var getIssuesForFutureSprint = function (i) {
            jsonService.getIssues($scope.futureSprints[i]).then(function (promise) {
                $scope.futureIssues[i] = promise;
            });
        };

        $scope.$watch('issues', function () {
            if ($scope.issues !== undefined) {
                calculateTimeMetrics();
                calculateStoryPoints();
                calculateBlocker();
                if ($scope.pointsDone === 0 || $scope.pointsTotal === 0) {
                    $scope.workComplete = 0;
                } else {
                    $scope.workComplete = Math.round($scope.pointsDone * 100 / $scope.pointsTotal);
                }
                var flagged = $filter('flagged')($scope.issues);
                $scope.impededBugs = $filter('bugs')(flagged);
                $scope.impededStories = $filter('stories')(flagged);
                $scope.impededSubTasks = $filter('sub-tasks')(flagged);
                $scope.impededTasks = $filter('tasks')(flagged);
                var onHold = $filter('onHold')($scope.issues);
                $scope.onHoldBugs = $filter('bugs')(onHold);
                $scope.onHoldStories = $filter('stories')(onHold);
                $scope.onHoldSubTasks = $filter('sub-tasks')(onHold);
                $scope.onHoldTasks = $filter('tasks')(onHold);
                $scope.next = issueService.getNextTasks($scope);
            }
        });

        $scope.$watch('backlog', function () {
            if ($scope.backlog !== undefined) {
                $scope.unplanned = $filter('tasks')($scope.backlog);
            }
        });

        $scope.getDaysInProgressForStory = function (story) {
            return issueService.getDaysInProgressForStory(story);
        };

        $scope.wipOverMax = function (column) {
            if ($scope.issues !== undefined && column.max > 0) {
                return $filter('status')($scope.issues, column.statuses).length > column.max;
            }
            return false;
        };

        var calculateTimeMetrics = function () {
            var totalDays = moment($scope.activeSprint.endDate).businessDiff(moment($scope.activeSprint.startDate));
            $scope.daysRemaining = moment($scope.activeSprint.endDate).businessDiff(moment()) - 1;

            var totalMinutes = totalDays * 24 * 60;

            var now = moment();
            var minutes = now.minute() + now.hour() * 60;

            $scope.timeElapsed = Math.round(100 - ($scope.daysRemaining * 24 * 60 + minutes) * 100 / totalMinutes);
        };

        var calculateStoryPoints = function () {
            $scope.pointsToDo = issueService.getPointsToDo($scope);
            $scope.pointsInProgress = issueService.getPointsInProgress($scope);
            $scope.pointsDone = issueService.getPointsDone($scope);
            $scope.pointsTotal = issueService.getPointsTotal($scope);
        };

        var calculateBlocker = function () {
            $scope.blocker = $filter('blockers')($scope.issues).length;
        };

        $scope.$watch('settings', function () {
            $cookies.put('settings', JSON.stringify($scope.settings));
        }, true);

        refresh();
        setToggleTimeOut();
    }]);
