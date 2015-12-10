'use strict';

/**
 * @ngdoc filter
 * @name tasks
 * @author Martijn van Lune <info@lunar-consultancy.com>
 * @copyright Lunar Consultancy 2015
 * @license GNU General Public License v2.0
 * @description
 *   Returns tasks from list of issues.
 */
angular.module('jiraWallboardApp')
    .filter('tasks', function () {

        /**
         * @param {issues[]} issues
         * @return {issues[]}
         */
        return function (issues) {
            var filteredIssues = [];
            if (issues !== undefined) {
                for (var i = 0; i < issues.length; ++i) {
                    var issue = issues[i];
                    if (issue.fields.issuetype !== undefined && issue.fields.issuetype.name === 'Task') {
                        filteredIssues.push(issue);
                    }
                }
            }
            return filteredIssues;
        };
    });