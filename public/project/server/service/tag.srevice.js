"use strict"
var q = require('q');
module.exports = function(app, tagModel) {
    app.get("/api/project/tags", getTags);
    app.get("/api/project/tag/:id", getTagById);
    app.put("/api/project/tag/:id", updateTagById);
    app.post("/api/project/tag", createTag);
    app.delete("/api/project/tag/:id", deleteTagById);
};
