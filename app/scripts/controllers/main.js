'use strict';

/**
 * @ngdoc function
 * @name publicHtmlApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the publicHtmlApp
 */
angular.module('publicHtmlApp')
  .controller('MainCtrl', function ($scope,$timeout) {
	var rootRef = new Firebase('https://glaring-torch-7103.firebaseio.com/messages');
	var messagesRef = rootRef.child('messages');
	
	childRef.on('value',function(snapshot){
	    $timeout(function(){
		var snapshotVal = snapshot.val();
		$scope.message = snapshot.val();
	    });
	});

  });
