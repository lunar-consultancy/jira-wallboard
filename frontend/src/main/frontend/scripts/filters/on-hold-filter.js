'use strict';

/**
 * @ngdoc filter
 * @name onHold
 * @author Martijn van Lune <info@lunar-consultancy.com>
 * @copyright Lunar Consultancy 2015
 * @license GNU General Public License v2.0
 * @description
 *   Returns issues from list of issues if on hold.
 */
angular.module('jiraWallboardApp')
    .filter('onHold', ['config', function (config) {

        /**
         * @param {issues[]} issues
         * @return {issues[]}
         */
        return function (issues) {

            var filteredIssues = [];
            if (issues !== undefined) {

                for (var iIssue = 0; iIssue < issues.length; ++iIssue) {
                    var issue = issues[iIssue];
                    if (config.STATUS_ON_HOLD.indexOf(issue.fields.status.name) > -1) {
                        filteredIssues.push(issue);
                    }
                }
            }
            return filteredIssues;
        };
    }]);