'use strict';

/**
 * @ngdoc function
 * @name publicHtmlApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the publicHtmlApp
 */
angular.module('publicHtmlApp')
  .controller('MainCtrl', function ($scope) {
	var rootRef = new Firebase('https://glaring-torch-7103.firebaseio.com/messages');
	var childRef = rootRef.child('message');

	$scope.setMessage = function(){
	    rootRef.child('message').set({
		user: 'Adam',
		text: 'Hi'
	    })
	}
`	//update can only update property
	// set always overwrite the existing object
	$scope.updateMessage = function(){
	    childRef.update({
		text:'Bye'
	    })
	}

	$scope.deleteMessage = function(){
	    childRef.remove()
	}

  });
