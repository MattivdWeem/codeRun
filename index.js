'use strict'




// server setup
var schemas     = require('./database/schemas'),
    mongoose    =  require('mongoose'),
    settings    = require('./env-defaults.json'),
    connect     = require('./database/connect')(mongoose, process.env.MONGO_URI || settings.MONGO_URI),
    secure = {
        salt: settings.salt,
        secret: settings.secret
    };

var serverDetails = require('./app/start')({
    port: process.env.PORT || settings.PORT,
    http: require('http'),
    https: require('https'),
    io: require('socket.io'),
    express: require('express')
});

//init the API
require('./app/init').init({
    clientHost: process.env.CLIENT_URI || settings.CLIENT_URI,
    mongoose: mongoose,
    app: serverDetails.app,
    models: require('./database/models')(schemas, mongoose),
    io: serverDetails.io,
    http: serverDetails.http,
    https: serverDetails.https,
    passport: require('passport'),
    cors: require('cors'),
    login: require('connect-ensure-login'),
    session: require('express-session'),
    async: require('async'),
    crypto: require('crypto'),
    helmet: require('helmet'),
    bodyParser: require('body-parser')
});

serverDetails.app.get('*', function (req, res) {
    var url = req.url;
});
