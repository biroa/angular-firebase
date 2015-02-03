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
	var childRef = rootRef.child('message');
	
	$scope.$watch('message.text', function(newVal){
	    //Make Sure it is not undefined
	    if(!newVal){
		return;
	    }
	    childRef.update({
		text:newVal
	    });
	});

	//With on we check firebase on realtime
	//
	childRef.on('value',function(snapshot){
	    $timeout(function(){

		//Available properties
		//console.log(snapshot.name());
		//console.log(snapshot.numChildren());
		//console.log(snapshot.hasChild('text'));
		//console.log(snapshot.hasChildren());
		
		snapshot.forEach(function(item){
		    console.log(item.key() +'-'+ item.val());
		    //eg. get data(image) from the certain point of the time
		    console.log(item.ref());
		});
		
		//data from the given period of time from firebase
		var snapshotVal = snapshot.val();
		console.log(snapshotVal);
		$scope.message = snapshot.val();
	    });
	});

	$scope.setMessage = function(){
	    rootRef.child('message').set({
		user: 'Adam',
		text: 'Hi'
	    })
	};
	//update can only update
	//set always overwrite the existing object
	$scope.updateMessage = function(){
	    childRef.update({
		text:'Bye'
	    })
	};

	$scope.deleteMessage = function(){
	    childRef.remove()
	};

  });
