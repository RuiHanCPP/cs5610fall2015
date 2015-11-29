"use strict";
var fieldSchema = require("field.schema.js")(mongoose);
module.exports = function(mongoose) {

    var formSchema = mongoose.schema({
        title: String,
        userId: String,
        fields: [fieldSchema]
    }, {collection: "cs5610.assignment.form"});

    return formSchema;
};