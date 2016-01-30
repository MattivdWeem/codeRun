var http = require('https');

module.exports =  function(app, options){

    app.notification = {};
    var _this = app.notification;
    var model = options.models.users;

    _this.send = function(target, notification, type) {

        var s = options.models.sessions;
        s.find(
            {
                "active":true,
                "members._id": target
            },function(err, docs){
                if (err) {
                    console.log(err);
                    return res.json({
                        "success": false
                    })
                }
                if (docs[0]){
                    var members = docs[0].members;
                    for (var i = 0; i < members.length; i++ ) {
                        console.log('sjocket sjingy');
                        console.log(members[i]);
                        console.log("SENDING SOCKET THINGY TO " + members[i]._id);
                        console.log(type);
                        console.log(notification);
                        var something = options.ns.to(members[i]._id).emit(type, notification);
                        console.log(something);
                    }
                }
            });
    };


    _this.pushNotification = function(connection, notification, settings){

      var request = http.request(
          {
              host: 'api.parse.com',
              path: '/1/push',
              method: 'POST',
              headers: {
                  'X-Parse-Application-Id': options.constants.parseApplicationId,
                  'X-Parse-REST-API-Key': options.constants.ParseAPIKey,
                  'Content-Type': 'application/json'
              }
          }, function(response){
              response.on('data', function(d) {
                  process.stdout.write(d);
              });
          })

        var data = {
            "where":{
                "deviceToken":{
                    "$in":[connection.value]
                }
            },
            "data":{
                "alert" : notification.title + ' \n' + notification.message,
                "data" : notification,
                "settings" : settings
            }

        };

        request.write(JSON.stringify(data));

        request.end();


        console.log('Sending a push notification to parse push ');
    }

};
