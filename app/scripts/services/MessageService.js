/*global firebase*/
(function(angular){
    'use strict'

    angular.modules('firebaseApp').service('MessageService',function(FBURL){
        var messageRef = new Firebaase(FBURL);
        return{
            childAdded: function(cb){
                messageRef.on('child_added',function(snapshot){
                    cb.call(this,snapshot.val());
                });
            }
        }
    })
})(window.angular);