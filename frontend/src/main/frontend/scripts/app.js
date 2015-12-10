'use strict';

/**
 * @ngdoc overview
 * @name jiraWallboardApp
 * @author Martijn van Lune <info@lunar-consultancy.com>
 * @copyright Lunar Consultancy 2015
 * @license GNU General Public License v2.0
 * @description
 * # jiraWallboardApp
 *
 * Main module of the application.
 */
angular
    .module('jiraWallboardApp', [
        'ngAnimate',
        'ngAria',
        'ngCookies',
        'ngMessages',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'angularMoment',
        'base64',
        'ngCookies',
        'chart.js'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                template: '<sprint></sprint><wip></wip>',
                controller: 'jiraWallboardCtrl',
                controllerAs: 'jiraWallboard'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
