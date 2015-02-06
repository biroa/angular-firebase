'use strict';

angular.module('publicHtmlApp')
    .controller('MainCtrl', function($scope, $timeout, MessageService) {

        $scope.currentUser = null;
        $scope.currentText = null;
        $scope.messages = [];

        MessageService.childAdded(function (addedChild) {
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