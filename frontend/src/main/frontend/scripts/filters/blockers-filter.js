'use strict';

/**
 * @ngdoc filter
 * @name blockers
 * @author Martijn van Lune <info@lunar-consultancy.com>
 * @copyright Lunar Consultancy 2015
 * @license GNU General Public License v2.0
 * @description
 *   Returns blocking issues from list of issues.
 */
angular.module('jiraWallboardApp')
    .filter('blockers', ['config', function (config) {

        /**
         * @param {issues[]} issues
         * @return {issues[]}
         */
        return function (issues) {
            var filteredIssues = [];
            if (issues !== undefined) {
                for (var i = 0; i < issues.length; ++i) {
                    var issue = issues[i];
                    if (issue.fields.issuetype !== undefined && config.BUG_TYPES.indexOf(issue.fields.issuetype.name) > -1) {
                        if (issue.fields.priority !== undefined && issue.fields.priority.name === config.STATUS_BLOCKER) {
                            filteredIssues.push(issue);
                        }
                    }
                }
            }
            return filteredIssues;
        };
    }]);