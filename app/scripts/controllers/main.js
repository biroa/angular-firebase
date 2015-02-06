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

    });