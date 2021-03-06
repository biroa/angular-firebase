/*global Firebase*/
(function(angular) {
    'use strict';

    angular.module('publicHtmlApp').service('MessageService', function(MSG_URL, $q, $rootScope, $firebase) {
        //maybe we need scope
        var scope = $rootScope.$new();
        scope.messageRef = new Firebase(MSG_URL).startAt().limitToFirst(10);
        scope.fireMessage = $firebase(scope.messageRef).$asArray();
        return {
            childAdded: function childAdded(cb) {
                scope.$on('child_added', function(data) {
                    var val = data.snapshot.value;
                    cb.call(this, {
                        user: val.user,
                        text: val.text,
                        key: data.snapshot.key
                    });
                });
            },
            add: function addMessage(message) {
                return fireMessage.$add(message);
            },
            off: function turnMessagesOff() {
                fireMessage.$off();
            },
            pageNext: function pageNext(name, numberOfItems) {
                var deferred = $q.defer();
                var messages = [];
                var pageMessageRef = new Firebase(MSG_URL).startAt(null, name).limitToFirst(numberOfItems);

                $firebase(pageMessageRef).$on('loaded', function(data) {
                    var keys = Object.keys(data);
                    angular.forEach(keys, function(key) {
                        var item = data[key];
                        item.name = key;
                        messages.push(item);
                    });
                    deferred.resolve(messages);
                });

                return deferred.promise;
            },
            pageBack: function pageBack(name, numberOfItems) {
                var deferred = $q.defer();
                var messages = [];
                var pageMessageRef = new Firebase(MSG_URL).endAt(null, name).limitToLast(numberOfItems);

                $firebase(pageMessageRef).$on('loaded', function(data) {
                    var keys = Object.keys(data);
                    angular.forEach(keys, function(key) {
                        var item = data[key];
                        item.name = key;
                        messages.push(item);
                    });
                    deferred.resolve(messages);
                });

                return deferred.promise;
            }
        };
    });

})(window.angular);