"use strict";
module.exports = function(mongoose) {
    var docSchema = mongoose.Schema({
        _id: {
            type: Schema.ObjectId
        },
        title: String,
        date: String,
        snapShot: String,
        content: String,
        tags: [{
            type: Schema.Types.ObjectId,
            ref: "cs5610.project.tag"
        }],
        comments: [{
            type: Schema.Types.ObjectId,
            ref: "cs5610.project.comment"
        }]
    }, {collection: "cs5610.project.document"});

    return docSchema;
};
