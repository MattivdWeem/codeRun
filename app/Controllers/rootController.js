module.exports = function (app, options, methods, Models, Controllers){

    var controller = {};
    controller.index = function(req, res){
        var routePaths = Models.rootModel.getPaths();
        return res.json(routePaths);
    }

    Controllers.rootController = controller;
}