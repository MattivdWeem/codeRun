module.exports = function(app, options, methods, Models, Controllers){

    /**
     * Gets all players inside your current game
     */
    app.post('/game',
        options.passport.authenticate('sessionToken'),
        function(req, res){
            return Controllers.gameController.create(req, res);
        });

    app.get('/game/:lobby',
        options.passport.authenticate('sessionToken'),
        function(req, res){
            return Controllers.gameController.get(req, res);
        });
    /**
     * Joins a specific game lobby
     */
    app.put('/game/:lobby',
        options.passport.authenticate('sessionToken'),
        function(req, res){
            if (!req.params.lobby) {
                methods.send(res, {}, false);
            }
            return Controllers.gameController.join(req, res, req.params.lobby);
        });



};
