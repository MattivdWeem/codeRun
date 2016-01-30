module.exports = function(passport, options){

	var CustomStrategy = require('passport-custom');

    /**
     *
     */
	passport.use('sessionToken', new CustomStrategy(
  		function(req, done) {

            if (!req.body.authorization && !req.headers.authorization && !req.headers.authorization) {
                console.log(req.headers);
                return done(null, false);
            }

            var token = req.body.authorization || req.headers.authorization || req.headers.authorization;
            token = token.replace('Bearer: ','');

            console.log("token: " + token);

            options.models.Session.findOne(
                {
                    Token: token
                },
            function(err, docs){


                if (err) {
                    console.log(err);
                    return done(null, false);
                }

                if (docs) {
                    options.models.User.findById(
                        docs.UserObjectId,
                    function(err, docs){
                        console.log("user");
                        console.log(docs);
                        req.user = docs;
                        return done(null, docs);
                    })

                } else {
                    return done(null, false);
                }
            });

  		}
	));

    /**
     *
     */
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    /**
     *
     */
    passport.deserializeUser(function(user, done) {
        done(null, user);
    });

};
