"use strict";
module.exports = function(app, commentModel) {
    app.get("/api/project/comment", getComment);
    app.get("/api/project/comment/:id", getCommentById);
    app.post("/api/project/comment", createComment);
    app.delete("/api/project/comment", deleteComment);

    function getComment(req, res) {
        if (req.query.docId) {
            commentModel
                .findAllCommentByDocId(req.query.docId)
                .then(function(comment) {
                    res.json(comment);
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
                res.json(comment);
            });
    }

    function deleteComment(req, res) {
        commentModel
            .deleteComment(req.params.id)
            .then(function(sizeOfComments) {
                res.json(sizeOfComments);
            });
    }
};
