"use strict";

module.exports = function(mongoose) {
    var superUserSchema = mongoose.Schema({
        _id: {
            type: Schema.ObjectId
        },
        username: String,
        password: String,
        selfDesc: String
    }, {collection: "cs5610.project.superUser"});

    return superUserSchema;
};
