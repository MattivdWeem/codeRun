module.exports = function (app, options, methods, Models, Controllers){

    var module = {}
    var Game = options.models.Game;

    module.join = function(user, session){


    }


    /**
     * Creates a new game with a random token
     */
    module.create = function(callback, tokenSize){

        var newGame = new Game({
            Token: methods.randomString(tokenSize || 7),
            Players: []
        }),data;

        newGame.save(function(err, docs){
            if(err){
                data =  module.create();
            }
            if (docs && !err){
                data =  docs;
            }

            callback(err,data);
        });



    }


    Models.gameModel = module;
}