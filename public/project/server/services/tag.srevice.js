"use strict"
var q = require('q');
module.exports = function(app, tagModel) {
    app.get("/api/project/tags", getTags);
    app.get("/api/project/tag/:id", getTagById);
    app.put("/api/project/tag/:idA/:idB", mergeTagsByIds);
    app.post("/api/project/tag", createTag);
    app.delete("/api/project/tag/:id", deleteTagById);

    function getTags(req, res) {
        if (req.query.tagName) {
            tagModel
                .findTagByName(req.query.tagName)
                .then(function(tag) {
                    res.json(tag);
                });
        } else {
            tagModel
                .findAllTags()
                .then(function(tags) {
                    res.json(tags);
                });
        }
    }

    function getTagById(req, res) {
        tagModel
            .findTagById(req.params.id)
            .then(function(tag) {
                res.json(tag);
            });
    }

    function mergeTagsByIds(req, res) {
        tagModel
            .mergeTags(req.params.idA, req.params.idB, req.body.tagName)
            .then(function(tag) {
                res.json(tag);
            });
    }

    function createTag(req, res) {
        tagModel
            .createTag(req.body)
            .then(function(tag) {
                res.json(tag);
            });
    }

    function deleteTagById(req, res) {
        tagModel
            .deleteTag(req.params.id)
            .then(function(numOfTags) {
                res.json(numOfTags);
            });
    }
};
