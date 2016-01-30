'use strict';

var App = {};

App.init = function(options){

    // require server options, authentication and routing
    var passport		= options.passport,
        schemas 		= options.schemas,
        mongoose 		= options.mongoose,
        methods         = {},
        Models          = {},
        Controllers     = {},
        app        	    = options.app;

    // initialize the server with the right cors headers and body parsing abbility's
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
    //require('./utils');
    require('./auth')(passport, options);
    app.use(passport.initialize());

    require('./methods')(app, options, methods);
    //require('./notifications')(app, options, methods);

    require('./Models')(app, options, methods, Models, Controllers);
    require('./Controllers')(app, options, methods, Models, Controllers)
    require('./Routes')(app, options, methods, Models, Controllers);

    app.get('*',function(req, res){res.header(404);res.send('Route not found');});
};

module.exports = App;
