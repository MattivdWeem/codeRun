module.exports = function(app, options, methods){
    app.post(
        '/endJourney',
        options.passport.authenticate('sessionToken'),
        function(req,res){
            options.models.User.FindById(
                req.user._id,
                function(err, docs){
                    var user = req.user._id;
                    if (err){
                        console.log(err);
                        return methods.send(res, {}, false);
                    }
                    user.pushall(
                        allJourneys: [currentJourney], 
                        function(err, docs)
                        {
                            if(err){
                                console.log(err);
                                return methods.send(res, {}, false);
                            }
                            user.delete: {
                                "currentJourney"
                            }
                        }
                    );
                }
            );
        }
    );
}