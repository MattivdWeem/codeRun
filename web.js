'use strict'

var serverDetails = require('./inc/server/start')({
    port: process.env.PORT || settings.PORT,
    http: require('http'),
    https: require('https'),
    io: require('socket.io'),
    express: require('express')
});


// server setup
var schemas     = require('./inc/db/schemas'),
    mongoose    =  require('mongoose'),
    settings = require('./env-defaults.json'),
    connect     = require('./inc/db/connect')(mongoose, process.env.MONGO_URI || settings.MONGO_URI),
    secure = {
        salt: settings.salt,
        secret: settings.secret
    };

//init the API
require('./inc/server/api/v1/init').init({
    clientHost: process.env.CLIENT_URI || settings.CLIENT_URI,
    mongoose: mongoose,
    app: serverDetails.app,
    io: serverDetails.io,
    http: serverDetails.http,
    https: serverDetails.https,
    passport: require('passport'),
    cors: require('cors'),
    login: require('connect-ensure-login'),
    session: require('express-session'),
    async: require('async'),
    crypto: require('crypto'),
    helmet: require('helmet')
});

serverDetails.app.get('*', function (req, res) {
    var url = req.url;
});
