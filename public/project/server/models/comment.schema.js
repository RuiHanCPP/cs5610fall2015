"use strict";
module.exports = function(mongoose) {
    var commentSchema = mongoose.Schema({
        _id: {
            type: Schema.ObjectId
        },
        docId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'cs5610.project.document'
        },
        content: String,
        isHost: Boolean,
        nickName: String,
        email: String,
        replyTo: {
            type: mogoose.Schema.Types.ObjectId,
            ref: 'cs5610.project.comment'
        }
    }, {collection: "cs5610.project.comment"});

    return commentSchema;
};
