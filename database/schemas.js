module.exports = {

    User: {
        facebookId: {
            type: String,
            required: true
        },
        email: {
            type: String

        },
        first_name:{
            type: String,
            required: true
        },
        last_name:{
            type: String,
            required: true
        },
        birthday:{
            type: Date,
            required: false
        },
        score: {
            type: Number,
            default: 0,
            required: true
        },
        currentJourney: [{
            datetime: {
                type: Date,
                default: Date.now,
                required: true
            },
            speed: {
                type: Number
            },
            location: {
                lon: {
                    type: Number,
                    required: true
                },
                lat: {
                    type: Number,
                    required: true
                }
            },
            score: {
                type: Number,
                required: true
            }
        }],
        allJourneys: [{
            datetime: {
                type: Date,
                required: true
            },
            speed: {
                type: Number
            },
            location: {
                lon: {
                    type: Number,
                    required: true
                },
                lat: {
                    type: Number,
                    required: true
                }
            },
            score: {
                type: Number,
                required: true
            }
        }]
    },

    Session: {
        Token: {
            type: String,
            required: true
        },
        UserObjectId: {
            type: Object,
            required: true
        }
    }

}
