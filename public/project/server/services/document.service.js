"use strict";
var q = require('q');
module.exports = function(app, docModel) {
    app.get("/api/project/document", getDocuments);
    app.get("/api/project/document/random", getRandomDocument);
    app.get("/api/project/document/:id", getDocumentById);
    app.get("/api/project/document/user/:uid", getDocumentByUserId);
    app.put("/api/project/document/tags", getDocumentByTagIds);
    app.put("/api/project/document/:id", updateDocumentById);
    app.post("/api/project/document", createDocument);
    app.delete("/api/project/document/:id", deleteDocumentById);

    function getDocumentByTagIds(req, res) {
        docModel
            .findDocByTags(req.body.tagIds)
            .then(function(docs) {
                res.json(docs);
            });
    }

    function getDocuments(req, res) {
        if (req.query.startDate || req.query.endDate) {
            var startDate = null;
            var endDate = null;
            if (req.query.startDate) {
                startDate = req.query.startDate;
            }
            if (req.query.endDate) {
                endDate = req.query.endDate;
            }
            docModel
                .findDocByTime(startDate, endDate)
                .then(function(docs) {
                    res.json(docs);
                });
        } else if (req.query.title) {
            docModel
                .findDocByTitle(req.query.title)
                .then(function(docs) {
                    res.json(docs);
                });
        } else {
            docModel
                .findAllDoc()
                .then(function(docs) {
                    res.json(docs);
                });
        }
    }

    function getRandomDocument(req, res) {
        docModel
            .findDocByRandom()
            .then(function(doc) {
                res.json(doc);
            });
    }

    function getDocumentById(req, res) {
        docModel
            .findDocById(req.params.id)
            .then(function(doc) {
                res.json(doc);
            });
    }

    function getDocumentByUserId(req, res) {
        docModel
            .findDocByUserId(req.params.uid)
            .then(function(docs) {
                res.json(docs);
            });
    }

    function updateDocumentById(req, res) {
        docModel
            .updateDoc(req.params.id, req.body)
            .then(function(doc) {
                res.json(doc);
            });
    }

    function createDocument(req, res) {
        var doc = req.body;
        docModel
            .createDoc(doc)
            .then(function(doc) {
                res.json(doc);
            });
    }

    function deleteDocumentById(req, res) {
        docModel
            .deleteDoc(req.params.id)
            .then(function(numOfDocs) {
                res.json(numOfDocs);
            });
    }
};