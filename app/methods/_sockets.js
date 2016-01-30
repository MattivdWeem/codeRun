module.exports = function(app, options, methods){

    methods.notification = {};
    methods.notification.send = function(target, notification, type, callback){
        var s = options.models.TableSession;
        s.find(
            {
                "Active":true,
                "_id": target
            },function(err, docs){
                if (err) {
                    console.log(err);
                    return res.json({
                        "success": false
                    })
                }
                if (docs[0]){
                    var members = docs[0].CheckedIn;
                    for (var i = 0; i < members.length; i++ ) {
                        console.log(type);
                        console.log(notification);
                        var something = options.ns.to(members[i]).emit(type, notification);
                        console.log(something);
                    }
                    if (callback){return callback(docs);}

                }
            });
    };

    methods.notification.ping = function(user_id, data, type, callback){
        methods.methods.getTableSession(user_id, function(data){
            methods.notifications.send(data._id,data, type, callback);
        })
    }



}