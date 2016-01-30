/*
*  init server
* */


'use strict';

module.exports = function(options){

    var app = options.express(),
        server = options.http.Server(app),
        io = options.io(server);

    server.listen(options.port);
    console.log('Server started on port: '+options.port);

    return {io: io, app: app};

};
