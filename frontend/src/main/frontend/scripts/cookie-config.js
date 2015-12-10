'use strict';

/**
 * @ngdoc config
 * @author Martijn van Lune <info@lunar-consultancy.com>
 * @copyright Lunar Consultancy 2015
 * @license GNU General Public License v2.0
 * @description
 *   Default settings for cookies
 */
angular.module('jiraWallboardApp')
    .config(['$cookiesProvider', 'moment', function ($cookiesProvider, moment) {
        $cookiesProvider.defaults.expires = moment().add(1, 'years').toDate();
    }]);
