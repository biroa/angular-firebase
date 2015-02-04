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
	$scope.messages = [];

	//value -> all items
	//child_added -> on first load get all data after that get only the last item when add someone a new item
	//with new child added we save exponentially increasing load that would cause value
	// with
	messagesRef.on('child_added',function(snapshot){
	    $timeout(function(){
		var snapshotVal = snapshot.val();
		$scope.messages.push({
			text: snapshotVal.text,
			user: snapshotVal.user,
			key: snapshot.key()
			}
			);
	    });
	});

		messagesRef.on('child_changed', function(snapshot) {
			$timeout(function() {
				var snapshotVal = snapshot.val();
				var message = findMessageByName(snapshot.key());
				message.text = snapshotVal.text;
			});
		});

		messagesRef.on('child_removed', function(snapshot) {
			$timeout(function() {
				deleteMessageByName(snapshot.key());
			});
		});

		function deleteMessageByName(keyID) {
			for(var i=0; i < $scope.messages.length; i++) {
				var currentMessage = $scope.messages[i];
				if (currentMessage.key === keyID) {
					delete $scope.messages[i];
					break;
				}
			}
		}

		function findMessageByName(keyID) {
			var messageFound = null;
			for(var i=0; i < $scope.messages.length; i++) {
				var currentMessage = $scope.messages[i];
				if (currentMessage.key === keyID) {
					messageFound = currentMessage;
					break;
				}
			}

			return messageFound;
		}

		$scope.sendMessage = function() {
			var newMessage = {
				user: $scope.currentUser,
				text: $scope.currentText
			};

			messagesRef.push(newMessage);
		};

	});