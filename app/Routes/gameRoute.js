module.exports = function(app, options, methods, Models, Controllers){

    /**
     * Gets all players inside your current game
     */
    app.get('/game', function(req, res){
        return Controllers.loginController.index(req, res);
    });


    /**
     * Joins a specific game lobby
     */
    app.post('/game', function(req, res){
        if (!req.body.lobby) {
            methods.send(res, {}, false);
        }
        return Controllers.gameController.join(req, res);
    });



};
