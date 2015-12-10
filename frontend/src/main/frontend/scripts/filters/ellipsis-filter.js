'use strict';

/**
 * @ngdoc filter
 * @name ellipsis
 * @author Martijn van Lune <info@lunar-consultancy.com>
 * @copyright Lunar Consultancy 2015
 * @license GNU General Public License v2.0
 * @description
 *   Returns text with ellipsis if over size.
 */
angular.module('jiraWallboardApp')
    .filter('ellipsis', ['config', function (config) {

        /**
         * @param {string} text
         * @return {string}
         */
        return function (text) {
            if (text !== undefined && text.length> config.ELLIPSIS) {
                return text.substring(0, config.ELLIPSIS) + '...';
            }
            return text;
        };
    }]);