'use strict';

/**
 * @ngdoc filter
 * @name id
 * @author Martijn van Lune <info@lunar-consultancy.com>
 * @copyright Lunar Consultancy 2015
 * @license GNU General Public License v2.0
 * @description
 *   Returns item with id from list of items.
 */
angular.module('jiraWallboardApp')
    .filter('id', function () {

        /**
         * @param {Object} items
         * @param {Object} id
         * @returns {Object}
         */
        return function (items, id) {
            if (items !== undefined) {
                for (var i = 0; i < items.length; ++i) {
                    var item = items[i];
                    if (item.id === id) {
                        return item;
                    }
                }
            }
            return undefined;
        };
    });