'use strict';

/**
 * @ngdoc service
 * @name jsonService
 * @author Martijn van Lune <info@lunar-consultancy.com>
 * @copyright Lunar Consultancy 2015
 * @license GNU General Public License v2.0
 * @description
 *   Service for querying Jira API.
 */
angular.module('jiraWallboardApp')
    .service('jsonService', ['$http', '$q', 'config', function ($http, $q, config) {

        /**
         * @typedef {{id: number, self: self, name: string, type: string}} board
         * @typedef {{id: string, self: string}} status
         * @typedef {{name: string, statusses: status[]}} column
         * @typedef {{columns: column[], constraintType: string}} columnConfig
         * @typedef {{displayName: string, fieldId: string}} field
         * @typedef {{field: field, type: string}} estimation
         * @typedef {{id: string, self: string}} filter
         * @typedef {{rankCustomFieldId: number}} ranking
         * @typedef {{columnConfig: columnConfig, estimation: estimation, filter: filter, ranking: ranking, self: string}} configuration
         * @typedef {{id: number, name: string, self: string, originBoardId: number, state: string, startDate: Date, endDate: Date}} sprint
         * @typedef {{48x48: string, 32x32: string, 24x24: string, 16x16: string}} avatarUrls
         * @typedef {{id: string, self: string, description: string, iconUrl: string, name: string, subtask: boolean}} issuetype
         * @typedef {{id: string, self: string, key: string, name: string, name: string, subtask: boolean, avatarUrls: avatarUrls}} project
         * @typedef {{key: string}} color
         * @typedef {{id: string, name: string, self: string, iconUrl: string}} priority
         * @typedef {{id: number, key: string, self: string, name: string, summary: string, color: color, done: boolean}} epic
         * @typedef {{}} version
         * @typedef {{key: string, name: string, self: string, emailAddress: string, displayName: string, active: boolean, timeZone: string, avatarUrls: avatarUrls}} person
         * @typedef {{id: number, key: string, self: string, name: string, colorName: string}} category
         * @typedef {{id: string, self: string, name: string, iconUrl: string, description: string, statusCategory: category}} status
         * @typedef {{progress: number, total: number}} progress
         * @typedef {{}} environment
         * @typedef {{votes: number, self: string, hasVoted: boolean}} votes
         * @typedef {{issuetype: issuetype, timespent: number, sprint: sprint, project: project, fixVersions: string[],
         *            aggregatetimespent: number, resolution: string, resolutiondate: Date, workratio: number,
         *            lastViewed: Date, created: Date, epic: epic, priority: priority, timeestimate: number,
         *            aggregatetimeoriginalestimate: number, versions: version[], issuelinks: issue[], assignee: person,
         *            updated: Date, status: status, timeoriginalestimate: number, description: string,
         *            aggregatetimeestimate: number, flagged: boolean, summary: string, creator: person, subtasks: issue[],
         *            reporter: person, aggregateprogress: progress, environment: environment, duedate: Date,
         *            closedSprints: sprint[], progress: progress, votes: votes
         *          }} fields
         * @typedef {{id: string, key: string, self: string, expand: string, fields: fields}} issue
         */

        /**
         *
         * @param {string} name
         * @returns {board}
         */
        this.getBoard = function (name) {
            return $http({
                method: 'GET',
                url: config.BASE_URL + config.API_URL + "/board?name=" + name
            }).then(function successCallback(response) {
                var data = response.data;
                if (data.values.length === 1) {
                    return data.values[0];
                } else {
                    return undefined;
                }
            }, function errorCallback() {
                return undefined;
            });
        };

        /**
         * @param {board} board
         * @returns {configuration}
         */
        this.getConfiguration = function (board) {
            return $http({
                method: 'GET',
                url: board.self + "/configuration"
            }).then(function successCallback(response) {
                return response.data;
            }, function errorCallback() {
                return undefined;
            });
        };

        /**
         * @param {board} board
         * @returns {Promise}
         */
        this.getSprints = function (board) {

            var deferred = $q.defer();
            var sprints = [];

            /**
             * @param {number} startAt
             * @returns {sprint[]}
             */
            function loadAllSprints(startAt) {
                $http({
                    method: 'GET',
                    url: board.self + "/sprint",
                    params: {startAt: startAt}
                }).then(function (response) {
                    var data = response.data;
                    sprints = sprints.concat(data.values);
                    if (!data.isLast) {
                        loadAllSprints(startAt + data.maxResults);
                    } else {
                        deferred.resolve(sprints);
                    }
                });
            }

            loadAllSprints(0);
            return deferred.promise;
        };


        /**
         * @param {sprint} sprint
         * @returns {Promise}
         */
        this.getIssues = function (sprint) {

            var deferred = $q.defer();
            var issues = [];

            /**
             * @param {number} startAt
             * @returns {issue[]}
             */
            function loadAllIssues(startAt) {
                $http({
                    method: 'GET',
                    url: sprint.self + "/issue",
                    params: {startAt: startAt}
                }).then(function (response) {
                    var data = response.data;
                    issues = issues.concat(data.issues);
                    if ((data.startAt + data.issues.length) < data.total) {
                        loadAllIssues(startAt + data.maxResults);
                    } else {
                        deferred.resolve(issues);
                    }
                });
            }

            loadAllIssues(0);
            return deferred.promise;
        };

        /**
         * @param {board} board
         * @returns {Promise}
         */
        this.getBacklog = function (board) {

            var deferred = $q.defer();
            var issues = [];

            /**
             *
             * @param {number} startAt
             * @returns {issue[]}
             */
            function loadAllBacklog(startAt) {
                $http({
                    method: 'GET',
                    url: board.self + "/backlog",
                    params: {startAt: startAt}
                }).then(function (response) {
                    var data = response.data;
                    issues = issues.concat(data.issues);
                    if ((data.startAt + data.issues.length) < data.total) {
                        loadAllBacklog(startAt + data.maxResults);
                    } else {
                        deferred.resolve(issues);
                    }
                });
            }

            loadAllBacklog(0);
            return deferred.promise;
        };

    }]);