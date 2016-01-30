module.exports = function(app, options, methods){


    /**
     *
     * @param accesToken
     * @param callback
     */
    methods.getUser = function(accesToken, callback){

        methods.get(
            {
                host: 'graph.facebook.com',
                path: '/me?fields=birthday,email,name,first_name,last_name&access_token=' + accesToken,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            },
            function(data){
                callback(data);
            });
    }


}