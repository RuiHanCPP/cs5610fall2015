"use strict"
var q = require('q');
module.exports = function(app, tagModel, docModel) {
    app.get("/api/project/tag", getTags);
    app.get("/api/project/tag/:id", getTagById);
    app.put("api/project/tag/:id", updateTagById);
    app.put("/api/project/tag/:idA/:idB", mergeTagsByIds);
    app.post("/api/project/tag", createTag);
    app.delete("/api/project/tag/:id", deleteTagById);

    function getTags(req, res) {
        tagModel
            .findAllTags()
            .then(function(tags) {
                res.json(tags);
            });
    }

    function getTagById(req, res) {
        tagModel
            .findTagById(req.params.id)
            .then(function(tag) {
                res.json(tag);
            });
    }

    function updateTagById(req, res) {
        tagModel
            .updateTagName(req.params.id, req.body.name)
            .then(function(tag) {
                res.json(tag);
            });
    }

    function mergeTagsByIds(req, res) {
        var idA = req.params.idA;
        var idB = req.params.idB;
        console.log(idA);
        console.log(idB);

        tagModel
            .deleteTag(idB)
            .then(function(size) {
                tagModel
                    .updateTagName(idA, req.body.tagName)
                    .then(function(tag) {
                        docModel
                            .findDocByTags([idB])
                            .then(function(docs) {
                                for (var i in docs) {
                                    docModel.mergeTagInDoc(docs[i].id, idB, idA)
                                        .then(function(doc){});
                                }
                                res.json(idA);
                            });
                    });
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
