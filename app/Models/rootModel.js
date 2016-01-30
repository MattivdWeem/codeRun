module.exports = function (app, options, methods, Models, Controllers){

    var module = {}
    module.getPaths = function(){
        var routePaths = {};
        app._router.stack.forEach(function (details) {
            var route = details.route;
            if (route && route.path !== '/') {
                routePaths[route.path] = route.methods;
            }
        });
        return routePaths;
    }
    Models.rootModel = module;
}