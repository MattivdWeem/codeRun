module.exports = function(app, options, methods, Models, Controllers){

    app.get('/', function(req, res){
        return Controllers.rootController.index(req, res);
    });

};
