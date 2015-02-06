/*global firebase*/
(function(angular){
    'use strict'

    angular.module('publicHtmlApp').service('MessageService',function(FBURL){
        var messageRef = new Firebase(FBURL).child('messages');
        return{
            childAdded: function(cb){
                messageRef.on('child_added',function(snapshot){
                    var val = snapshot.val();
                    cb.call(this, {
                        user: val.user,
                        text: val.text,
                        key: val.key()
                    });
                });
            }
        }
    })
})(window.angular);