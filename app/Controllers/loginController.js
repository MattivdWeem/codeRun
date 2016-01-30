module.exports = function (app, options, methods, Models, Controllers){

    var controller = {};
    controller.index = function(req, res){

    }

    controller.login = function(req, res){

        var token = methods.hash(Date.now() + JSON.stringify(req.body)+Math.random);
        if (!req.body.accessToken || req.body.accessToken == "") {
            return methods.send(res, {error: "No accestoken defined "}, false);
        }
        methods.getUser(req.body.accessToken,
            function(data){

                var User = options.models.User,
                    Session = options.models.Session;

                User.findOne({facebookId: data.id},
                    function(err, docs) {

                        if (err) {
                            return methods.send(res, {error: err}, false);
                        }

                        if (docs) {

                            docs.update(data);
                            var s = new Session({
                                UserObjectId: docs._id,
                                Token: token
                            });
                            s.save(function () {

                                return methods.send(res, {
                                    token: token,
                                    user: data,
                                    data: docs
                                }, true);

                            });
                        } else {
                            var user = new User();
                            user.facebookId =  data.id,
                                user.birthday = data.birthday,
                                user.full_name = data.name,
                                user.first_name = data.first_name,
                                user.last_name = data.last_name,
                                user.email = data.email;
                            user.save(function(err, data){
                                console.log(err||data);
                                return methods.send(res, {
                                    token: token,
                                    user: data,
                                    data: docs
                                }, true);
                            });
                        }

                    });
            });
    }

    Controllers.loginController = controller;
}