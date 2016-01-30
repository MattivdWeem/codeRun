module.exports = function(app, options, methods){
    app.post(
        // TODO: get data from input
        '/locationCheck',
        options.passport.authenticate('sessionToken'),
        function(req,res){
            options.models.User.findById(
                req.user._id, {
                    $push: {
                        "currentJourney": {
                            speed: 22,
                            location: {
                                lon: 52,
                                lat: 5
                            },
                            score: 2.3
                        }
                    }
                }, {
                    safe: true, upsert: true
                },
                function(err, docs) {
                    if (err) {
                        console.log(err);
                        return methods.send(res, {}, false);
                    }
                    return methods.send(res, docs, true);
                }
            );
    });
}