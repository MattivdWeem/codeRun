module.exports = function (app, options, methods){

    /**
     *
     * @param text
     * @returns {*}
     */
    methods.geoSockets = function (userId, locations) {

        var u = options.models.User;

        methods.insertGeo(userId, locations, function(){

            u.findById(
                userId,
                function(err, docs){
                    if(err){
                        console.log(err);
                        return false;
                    }

                    if (docs) {
                        if (docs.currentJourney.length) {
                            var lastOnes = docs.currentJourney.slice(Math.max(docs.currentJourney.length - 4, 1))
                            for (var i = 0; i < lastOnes.length; i++) {
                                if (!i){
                                    var startLon = locations.lon,
                                        startLat = locations.lat;
                                } else {
                                    var startLon, startLat = false;
                                }
                                methods.calcDistance(
                                    {lon: startLon || lastOnes[i-1].location.lon, lat: startLat || lastOnes[i-1].location.lat},
                                    {lon: lastOnes[i].location.lon, lat: lastOnes[i].location.lat},
                                    function(res){
                                    console.log('distance: '+ res);
                                    });
                            }
                        }
                    }
                    return false;
                }
            )
        });
    };

    methods.insertGeo = function(userId, locations, callback){
        options.models.User.findOneAndUpdate(
            {_id: userId},
            {$push: {"currentJourney": {location:{"lon": locations.lon, "lat": locations.lat}}}},
            {safe: true, upsert: true},
            function(err, model) {
                if (err){
                    return console.log(err);
                }
                return callback(err, model);
            }

        );

    }

    methods.getUserBySession = function(session, callback){

        options.models.Session.findOne(
            {Token: session},
            function(err, docs){
                if (err){
                    console.log(err);
                    return false;
                }

                if (docs) {
                    return callback(docs);
                }

                return false;
            }
        )


    }

    /** Converts numeric degrees to radians */
    if(typeof(Number.prototype.toRadians) === "undefined") {
        Number.prototype.toRadians = function () {
            return this * Math.PI / 180;
        }
    }

    methods.calcDistance = function(coord_one, coord_two, callback){

        var R = 6371000; // metres
        var φ1 = coord_one.lat.toRadians();
        var φ2 = coord_two.lat.toRadians();
        var Δφ = (coord_two.lat - coord_one.lat).toRadians();
        var Δλ = (coord_two.lon - coord_one.lon).toRadians();

        var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        return callback(R * c);
    }
}