'use strict';

angular.module('publicHtmlApp')
    .controller('MainCtrl', function($scope, $timeout, MessageService) {
        var ChildNum = 4;
        $scope.currentUser = null;
        $scope.currentText = null;
        $scope.messages = [];


        MessageService.childAdded(ChildNum ,function (addedChild) {
            $timeout(function () {
                $scope.messages.push(addedChild);
            });
        });

        $scope.sendMessage = function () {
            var newMessage = {
                user: $scope.currentUser,
                text: $scope.currentText
            };

            MessageService.add(newMessage);
        };

        $scope.turnFeedOff = function () {
            MessageService.off();
        };

        $scope.pageNext = function(){
            var lastItem = $scope.messages[$scope.messages.length-1];
            MessageService.pageNext(lastItem.key,ChildNum).then(function(messages){
               $scope.messages= messages;
            });
        };

        $scope.pageBack = function(){
            var firstItem = $scope.messages[0];
            MessageService.pageBack(firstItem.key,ChildNum).then(function(messages){
                $scope.messages= messages;
            });
        }

    });