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
	
	$scope.currentUser = null;
	$scope.currentText = null;

	messagesRef.on('value',function(snapshot){
	    $timeout(function(){
		var snapshotVal = snapshot.val();
		$scope.messages = snapshot.val();
	    });
	});

	$scope.sendMessage = function(){
	    var newMessage = {
		user: $scope.currentUser,
		text: $scope.currentText
	    };
	    //set allows to control the name
	    //push create a unique name
	    messagesRef.push(newMessage);
	    
	}
	

  });
