"use strict";
var q = require('q');

module.exports = function(app, mongoose) {
    var commentSchema = require('./comment.schema.js');
    var commentModel = mongoose.model('commentModel', commentSchema);
    var debugA = true;
    var debugB = false;

    var apis = {
        createComment: createComment,
        deleteComment: deleteComment,
        findAllComment: findAllComment,
        findAllCommentByDocId: findAllCommentByDocId,
        findCommentById: findCommentById
    };

    return apis;

    function createComment(comment) {
        var deferred = q.defer();
        delete comment._id;
        commentModel.create(comment, function(err, newComment) {
            if (err) {
                if (debugA) {
                    console.log("cannot create comment " + err);
                }
                deferred.reject();
            } else {
                if (debugB) {
                    console.log("comment created " + newCommet);
                }
                deferred.resolve(newComment);
            }
        });
        return deferred.promise;
    }

    function deleteComment(cId) {
        var deferred = q.defer();
        commentModel.remove({_id: cId}, function(err, res) {
            if (err) {
                if (debugA) {
                    console.log("cannot delete comment " + err);
                }
                deferred.reject();
            } else {
                if (debugB) {
                    console.log("comment deleted");
                }
                commentModel.find(function(err, comments) {
                    if (err) {
                        if (debugA) {
                            console.log("cannot find all comment after delete " + err);
                        }
                        deferred.reject();
                    } else {
                        if (debugB) {
                            console.log("the number of remaining comments is " + comments.length);
                        }
                        deferred.resolve(comments.length);
                    }
                });
            }
        });
        return deferred.promise;
    }

    function findAllComment() {
        var deferred = q.defer();
        commentModel.find(function(err, comments) {
            if (err) {
                if (debugA) {
                    console.log("cannot find all comments " + err);
                }
                deferred.reject();
            } else {
                if (debugB) {
                    console.log("found all the comments, totally " + comments.length);
                }
                deferred.resolve(comments);
            }
        });
        return deferred.promise;
    }

    function findAllCommentByDocId(docId) {
        var deferred = q.defer();
        commentModel.find({docId: docId}, function(err, comments) {
            if (err) {
                if (debugA) {
                    console.log("cannot find all comments under document " + docId + " " + err);
                }
                deferred.reject();
            } else {
                if (debugB) {
                    console.log("found " + comments.length + " comments under doc " + docId);
                }
                deferred.resolve(comments);
            }
        });
        return deferred.promise;
    }

    function findCommentById(commentId) {
        var deferred = q.defer();
        commentModel.findOne({_id: commentId}, function(err, comment) {
            if (err) {
                if (debugA) {
                    console.log("cannot find comment " + commentId + " " + err);
                }
                deferred.reject();
            } else {
                if (debugB) {
                    console.log("found comment " + comment.content);
                }
                deferred.resolve(comment);
            }
        });
        return deferred.promise;
    }
};
