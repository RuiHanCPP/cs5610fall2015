"use strict";

// tags crud, tags merge

module.exports = function(mongoose) {
    var tagSchema = mongoose.Schema({
        _id: {
            type: Schema.ObjectId
        },
        tagName: String,
        parentTagId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'cs5610.project.tag'
        },
        childTagIds: [{
           type: mongoose.Schema.Types.ObjectId,
            ref: 'cs5610.project.tag'
        }],
        docIds: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'cs5610.project.document'
        }]
    }, {collection: "cs5610.project.tag"});

    return tagSchema;
};
