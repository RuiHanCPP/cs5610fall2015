"use strict";
module.exports = function(mongoose) {
    var commentSchema = mongoose.Schema({
        content: String,
        userId: String,
        replyTo: String,
        docId: String
    }, {collection: "cs5610.project.comment"});

    return commentSchema;
};
