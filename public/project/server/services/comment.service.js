"use strict";
module.exports = function(app, commentModel, docModel) {
    app.get("/api/project/comment", getComment);
    app.get("/api/project/comment/:id", getCommentById);
    app.post("/api/project/comment", createComment);

    function getComment(req, res) {
        if (req.query.docId) {
            var comments = [];
            docModel
                .findDocById(req.query.docId)
                .then(function(doc) {
                    for (var i = 0; i < doc.comments.length; ++i) {
                        commentModel
                            .findCommentById(doc.comments[i])
                            .then(function(comment) {
                                comments.push(comment);
                                if (comments.length == doc.comments.length) {
                                    res.json(comments);
                                }
                            });
                    }
                });
        } else {
            commentModel
                .findAllComment()
                .then(function(comments) {
                    res.json(comments);
                });
        }
    }

    function getCommentById(req, res) {
        commentModel
            .findCommentById(req.params.id)
            .then(function(comment) {
                res.json(comment);
            });
    }

    function createComment(req, res) {
        commentModel
            .createComment(req.body)
            .then(function(comment) {
                docModel
                    .addCommentIdToDoc(comment.docId, comment.id)
                    .then(function(newDoc) {
                        res.json(comment);
                    });
            });
    }
};
