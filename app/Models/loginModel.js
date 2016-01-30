module.exports = function (app, options, methods, Models, Controllers){

    var module = {}
    module.getFacebookUser = function(accesToken, callback){
        return methods.getUser(accesToken, callback);
    }
    Models.loginModel = module;
}