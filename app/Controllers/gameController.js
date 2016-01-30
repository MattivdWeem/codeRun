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

    /**
     *
     * @param req
     * @param res
     * @param lobby
     */
    controller.get = function(req,res,lobby){
        options.models.Game.findOne({Token:lobby}, function(err,docs){
            if (err){return methods.send(res,err,false);}
            if (docs){return methods.send(res,docs,true);}
        })
    }

    /**
     *
     * @param req
     * @param res
     * @param lobby
     */
    controller.join = function (req, res, lobby) {
        var m = Models.gameModel;


        m.join(req.user, lobby, function(err, docs){

            if (err){
                return methods.send(res,err,false);
            }
            if (docs){
                return methods.send(res,docs,true);
            }
        })


    }

    Controllers.gameController = controller;
}