module.exports = function(app, options, methods){
    app.get(
        '/highscoreList',
        //options.passport.authenticate('sessionToken'),
        function(req,res){
            options.models.User.find(
                {},
                function(err, docs) {
                    if (err) {
                        console.log(err);
                        return methods.send(res, {}, false);
                    }
                    return methods.send(res, docs, true);
            });
       });
}