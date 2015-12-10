'use strict';

/**
 * @ngdoc filter
 * @name futureSprint
 * @author Martijn van Lune <info@lunar-consultancy.com>
 * @copyright Lunar Consultancy 2015
 * @license GNU General Public License v2.0
 * @description
 *   Returns future sprints from list of sprints.
 */
angular.module('jiraWallboardApp')
    .filter('futureSprint', function () {

        /**
         * @param {sprint[]} sprints
         * @return {sprint[]}
         */
        return function (sprints) {
            var filteredSprints = [];
            if (sprints !== undefined) {
                for (var i = 0; i < sprints.length; ++i) {
                    var sprint = sprints[i];
                    if (sprint.state === 'future') {
                        filteredSprints.push(sprint);
                    }
                }
            }
            return filteredSprints;
        };
    });