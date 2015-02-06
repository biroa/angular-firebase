/*global Firebase*/
(function(angular) {
    'use strict';

    angular.module('publicHtmlApp').service('MessageService', function(FBURL) {
        var messageRef = new Firebase(FBURL).child('messages');
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
            }
        };
    });

})(window.angular);