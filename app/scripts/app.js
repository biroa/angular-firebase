'use strict';

/**
 * @ngdoc overview
 * @name publicHtmlApp
 * @description
 * # publicHtmlApp
 *
 * Main module of the application.
 */
angular
    .module('publicHtmlApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'firebase'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/about', {
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl'
            })
            .when('/chat', {
                templateUrl: 'views/chat.html',
                controller: 'ChatCtrl'
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            })
            .when('/register', {
                templateUrl: 'views/register.html',
                controller: 'RegisterCtrl'
            })
            .when('/logout', {
                template: 'Logging out...',
                controller: 'LogoutCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .constant('FBURL', 'https://brilliant-fire-2753.firebaseio.com/')
    .constant('MSG_URL', 'https://brilliant-fire-2753.firebaseio.com/messages');