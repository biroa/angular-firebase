/*global Firebase*/
(function(angular) {
    'use strict';

    angular.module('publicHtmlApp').service('MessageService', function(FBURL, $q, $firebase) {
        var messageRef = new Firebase(FBURL).child('messages');
        var fireMessage = $firebase(messageRef);
        return {
            childAdded: function childAdded(limitNumber,cb) {
                //limit retrieve the last x items: limitToFirst(x)
                //limit retrieve the last x items: limitToLast(x)
                //startAt() modifies it to the first x = key(): startAt(priority,key())
                //endAt()
                messageRef.startAt(null,'-JhLhFJgVT1756I7BrbC').endAt(null,'-JhLhFJgVT1756I7BrbC').on('child_added', function(snapshot) {
                    var val = snapshot.val();
                    cb.call(this, {
                        user: val.user,
                        text: val.text,
                        key: snapshot.key()
                    });
                });
            },
            add: function addMessage(message) {
                messageRef.push(message);
            },
            off: function turnMessagesOff() {
                messageRef.off();
            },
            pageNext: function pageNext(key,numberOfItem){
                var deferred = $q.defer();
                var messages = [];
                messageRef.startAt(null,key).limitToFirst(numberOfItem).once('value', function(snapshot){
                   snapshot.forEach(function(snapItem){
                       var itemVal = snapItem.val();
                       itemVal.key = snapItem.key();
                       messages.push(itemVal);
                   });
                    deferred.resolve(messages);
                });
                return deferred.promise;
            },
            pageBack: function pageBack(key,numberOfItem){
                var deferred = $q.defer();
                var messages = [];
                messageRef.endAt(null,key).limitToFirst(numberOfItem).once('value', function(snapshot){
                    snapshot.forEach(function(snapItem){
                        var itemVal = snapItem.val();
                        itemVal.key = snapItem.key();
                        messages.push(itemVal);
                    });
                    deferred.resolve(messages);
                });
                return deferred.promise;
            }
        };
    });

})(window.angular);