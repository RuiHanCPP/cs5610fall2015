"use strict";

// tags crud, tags merge

module.exports = function(mongoose) {
    var tagSchema = mongoose.Schema({
        tagName: {
            type: String,
            required: true,
            unique: true
        }
    }, {collection: "cs5610.project.tag"});

    return tagSchema;
};
