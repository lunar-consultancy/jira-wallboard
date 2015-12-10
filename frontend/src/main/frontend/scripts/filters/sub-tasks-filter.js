'use strict';

/**
 * @ngdoc filter
 * @name sub-tasks
 * @author Martijn van Lune <info@lunar-consultancy.com>
 * @copyright Lunar Consultancy 2015
 * @license GNU General Public License v2.0
 * @description
 *   Returns sub tasks from list of issues.
 */
angular.module('jiraWallboardApp')
    .filter('sub-tasks', function () {

        /**
         * @param {issues[]} issues
         * @return {issues[]}
         */
        return function (issues) {
            var filteredIssues = [];
            if (issues !== undefined) {
                for (var i = 0; i < issues.length; ++i) {
                    var issue = issues[i];
                    if (issue.fields.issuetype !== undefined && issue.fields.issuetype.name === 'Sub-task') {
                        filteredIssues.push(issue);
                    }
                }
            }
            return filteredIssues;
        };
    });