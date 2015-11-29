"use strict";
module.exports = function(mongoose) {

    var fieldSchema = mongoose.schema({
        label: String,
        type: {
            type: String,
            enum: ["TEXT, TEXTAREA, RADIO, CHECKBOX, SELECT, DATE"]
        },
        options: [{
            label: String,
            value: String
        }],
        placeholder: String
    });

    return fieldSchema;
};
