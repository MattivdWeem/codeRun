module.exports = {

    User: {
        facebookId: {
            type: String,
            required: true
        },
        email: {
            type: String

        },
        first_name: {
            type: String,
            required: true
        },
        last_name: {
            type: String,
            required: true
        },
        birthday: {
            type: Date,
            required: false
        },
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
    },
    Game:{
        Url:{
            type: String,
            required: true
        },
        Players: [{
            userObjectId:{
                type:Object,
                required: true
            },
            Distance: {
                type: Number
            },
            Deaths: {
                type: Number
            }
        }]
    }

}
