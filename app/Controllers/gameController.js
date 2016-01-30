module.exports = function (app, options, methods, Models, Controllers) {

    var controller = {};

    /**
     *
     * @param req
     * @param res
     */
    controller.create = function (req, res) {
        var m = Models.gameModel;
        m.create(function (err, docs){
            if (!err){
                methods.send(res, docs,true);
            }
        });

    }

    controller.join = function (req, res) {
        var m = Models.gameModel;
    }

    Controllers.gameController = controller;
}