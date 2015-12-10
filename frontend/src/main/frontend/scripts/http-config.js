'use strict';

/**
 * @ngdoc config
 * @author Martijn van Lune <info@lunar-consultancy.com>
 * @copyright Lunar Consultancy 2015
 * @license GNU General Public License v2.0
 * @description
 *   Default settings for http
 */
angular.module('jiraWallboardApp')
    .config(['$httpProvider', '$base64', 'config', function ($httpProvider, $base64, config) {
        $httpProvider.defaults.useXDomain = true;
        $httpProvider.defaults.headers.common.Accept = "application/json";
        $httpProvider.defaults.headers.common["Content-Type"] = "application/json";
        $httpProvider.defaults.headers.common.Authorization = 'Basic ' + $base64.encode(config.USERNAME + ':' + config.PASSWORD);
    }]);
