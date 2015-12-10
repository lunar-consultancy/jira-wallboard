'use strict';

/**
 * @ngdoc filter
 * @name ifEmpty
 * @author Martijn van Lune <info@lunar-consultancy.com>
 * @copyright Lunar Consultancy 2015
 * @license GNU General Public License v2.0
 * @description
 *   Returns defaultValue if 0, defaultIndefined when undefined or empty else the input.
 */
angular.module('jiraWallboardApp')
    .filter('ifEmpty', function () {

        /**
         * @param {string} input
         * @param {string} defaultValue
         * @param {string} defaultUndefined
         * @returns {string|*}
         */
        return function (input, defaultValue, defaultUndefined) {
            if (input === 0) {
                return defaultValue;
            }
            if (angular.isUndefined(input) || input === null || input === '') {
                return defaultUndefined;
            }
            return input;
        };
    });