'use strict';

/**
 * @ngdoc filter
 * @name status
 * @author Martijn van Lune <info@lunar-consultancy.com>
 * @copyright Lunar Consultancy 2015
 * @license GNU General Public License v2.0
 * @description
 *   Returns issues from list of issues if issue has same status given in list of statuses.
 */
angular.module('jiraWallboardApp')
    .filter('status', function () {

        /**
         * @param {issues[]} issues
         * @param {status[]} statuses
         * @return {issues[]}
         */
        return function (issues, statuses) {

            var filteredIssues = [];
            if (issues !== undefined) {
                var statusIds = [];
                for (var iStatus = 0; iStatus < statuses.length; ++iStatus) {
                    statusIds.push(statuses[iStatus].id);
                }

                for (var iIssue = 0; iIssue < issues.length; ++iIssue) {
                    var issue = issues[iIssue];
                    if (statusIds.indexOf(issue.fields.status.id) > -1) {
                        filteredIssues.push(issue);
                    }
                }
            }
            return filteredIssues;
        };
    });