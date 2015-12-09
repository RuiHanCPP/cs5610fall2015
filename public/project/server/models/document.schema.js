"use strict";
module.exports = function(mongoose) {
    var random = require('mongoose-random');
    var docSchema = mongoose.Schema({
        title: String,
        date: Date,
        snapShot: String,
        content: String,
        tags: [String],
        comments: [String],
        userId: String
    }, {collection: "cs5610.project.document"});
    docSchema.plugin(random, { path: 'r' });

    return docSchema;
};
