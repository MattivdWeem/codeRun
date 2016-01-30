'use strict';

var Api = {};

Api.init = function(options){

    // require server options, authentication and routing
    var passport		= options.passport,
        schemas 		= options.schemas,
        mongoose 		= options.mongoose,
        methods         = {},
        app        		= options.app;

    options.models      = require('./models')(schemas, mongoose);


    app.use(options.bodyParser.urlencoded({ extended: true }));
    app.use(options.bodyParser.json());
    app.use(options.helmet());

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "POST, PUT, GET, DELETE");
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, authorization"
        );
        next();
    });




    // include the utility's
    require('./utils');
    require('./auth')(passport, options);
    app.use(passport.initialize());

    require('./methods')(app, options, methods);
    require('./notifications')(app, options, methods);
    require('./routes')(app, options, methods);




    options.io.on('connection', function (socket) {
        //socket.emit('news', { hello: 'world' });
        socket.on('new_data', function (data) {

            if (!data.locations || !data.session) {
                return false;
            }


            methods.getUserBySession(data.session, function(result){
                methods.geoSockets(result.UserObjectId, data.locations);
            })


        });
    });


    app.get(
        '/test',
        options.passport.authenticate('sessionToken'),
        function(req,res){
            console.log(req);
            res.send([1,2,3,4,5,6,7,8,9,10]);
        });


    // catch all route
    app.get(
        '*',
        function(req, res){
            res.header(404);
            res.send('Route not found');
        });


};

module.exports = Api;
