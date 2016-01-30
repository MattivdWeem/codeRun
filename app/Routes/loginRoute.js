module.exports = function(app, options, methods, Models, Controllers){

    app.get('/login', function(req, res){
        return Controllers.loginController.index(req, res);
    });

    /**
     *  Sign in the user.
     */
    app.post(
        '/user',
        function(req, res){
            return Controllers.loginController.login(req, res);
        });


};
