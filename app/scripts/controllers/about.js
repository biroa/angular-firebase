'use strict';

/**
 * @ngdoc function
 * @name publicHtmlApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the publicHtmlApp
 */
angular.module('publicHtmlApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
