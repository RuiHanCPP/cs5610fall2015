"use strict";

module.exports = function(mongoose) {
    var userSchema = mongoose.Schema({
        username: {
            type: String,
            required: true,
            index: {
                unique: true,
                dropDups: true
            }
        },
        password: String,
        email: {
            type:String,
            required: true,
            index: {
                unique: true,
                dropDups: true
            }
        },
        selfDesc: String,
        avatar: String,
        isAdmin: {
            type: Boolean,
            required: true
        },
        newComments: [String],
        nickName: String
    }, {collection: "cs5610.project.user"});

    return userSchema;
};
