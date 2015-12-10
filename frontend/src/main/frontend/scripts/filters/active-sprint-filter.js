'use strict';

/**
 * @ngdoc filter
 * @name activeSprint
 * @author Martijn van Lune <info@lunar-consultancy.com>
 * @copyright Lunar Consultancy 2015
 * @license GNU General Public License v2.0
 * @description
 *   Returns active sprint from list of sprints.
 */
angular.module('jiraWallboardApp')
    .filter('activeSprint', function () {

        /**
         * @param {sprint[]} sprints
         * @return {sprint[]}
         */
        return function (sprints) {
            var filteredSprints = [];
            if (sprints !== undefined) {
                for (var i = 0; i < sprints.length; ++i) {
                    var sprint = sprints[i];
                    if (sprint.state === 'active') {
                        filteredSprints.push(sprint);
                    }
                }
            }
            return filteredSprints;
        };
    });