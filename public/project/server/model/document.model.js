"use strict";
var q = require('q');

module.exports = function(app, mongoose) {
    var tagModel = require('./tag.model.js');
    var commentModel = require('./comment.model.js');
    var docSchema = require('./document.schema.js');
    var docModel = mongoose.model('documentModel', docSchema);
    var debugA = true;
    var debugB = false;

    var apis = {
        createDoc: createDoc,
        deleteDoc: deleteDoc,
        updateDoc: updateDoc,
        findAllDoc: findAllDoc,
        findDocById: findDocById,
        findDocByTime: findDocByTime,
        findDocByTitle: findDocByTitle,
        addCommentIdToDoc: addCommentIdToDoc,
        deleteCommentIdFromDoc: deleteCommentIdFromDoc,
        addTagIdToDoc: addTagIdToDoc,
        deleteTagIdFromDoc: deleteTagIdFromDoc,
        mergeTagInDoc: mergeTagInDoc
    };

    return apis;

    function createDoc(document) {
        delete document._id;
        var deferred = q.defer();
        document.date = new Date();
        docModel.create(document, function(err, newDoc) {
            if (err) {
                if (debugA) {
                   console.log("rejected while creating: " + err);
                }
                deferred.reject();
                } else {
                    deferred.resolve(newDoc);
                if (debugB) {
                   console.log("get new doc " + newDoc.title);
                }
                for (var i in tags) {
                    tagModel.addDocIToTag(tags[i], doc._id).then(function(tag) {
                        if (debug) {
                            for (var j in tag.docIds) {
                                if (tag.docIds[j] == doc._id) {
                                    console.log("found doc id in tag's doc list");
                                    break;
                                }
                            }
                        }
                    });
                }
                deferred.resolve(newDoc);
            }
        });
        return deferred.promise;
    }

    function deleteDoc(docId) {
        var deferred = q.defer();
        docModel.findOne({id: docId}, function(err, doc) {
            if (err) {
                if (debugA) {
                    console.log("rejected while searching doc: " + err);
                }
                deferred.reject();
            } else {
                for (var i in doc.tags) {
                    tagModel.deleteDocIdFromTag(doc.tags[i], docId)
                        .then(function(tag) {});
                }
                for (var i in doc.comments) {
                    commentModel.deleteComment(doc.comments[i]).then(function(){});
                }
            }
        });
        docModel.delete({_id: docId}, function(err, respond) {
            if (err) {
                if (debugA) {
                    console.log("rejected while deleting: " + err);
                }
                deferred.reject();
            } else {
                docModel.find(function(err, docs) {
                    if (err) {
                        if (debugA) {
                            console.log("rejected while finding all: " + err);
                        }
                        deferred.reject(err);
                    } else {
                        if (debugB) {
                            console.log("cur size of docs " + docs.length);
                        }
                        deferred.resolve(docs.length);
                    }
                });
            }
        });
        return deferred.promise;
    }

    function updateDoc(docId, document) {
        var deferred = q.defer();
        delete document._id;
        delete docuemtn.comments;
        document.date = new Date();
        docModel.findOne({_id: docId}, function(err, doc) {
            if (err) {
                if (debugA) {
                    console.log("rejected while finding one: " + err);
                }
                deferred.reject();
            } else {
                if (debugB) {
                    console.log("doc found " + doc.title + doc.date);
                }
                for (var property in document) {
                    doc[property] = document[property];
                }
                doc.save(function(err, newDoc) {
                    if (err) {
                        if (debugA) {
                            console.log("rejected while saving: " + err);
                        }
                        deferred.reject();
                    } else {
                        if (debugB) {
                            console.log("doc saved" + newDoc.date);
                        }
                        deferred.resolve(newDoc);
                        updateDocIdToTag(doc.tags, newDoc.tags, newDoc._id);
                    }
                });
            }
        });
        return deferred.promise;
    }

    function findAllDoc() {
        var deferred = q.defer();
        docModel.find(function(err, docs) {
            if (err) {
                if (debugA) {
                    console.log("rejected while finding all: " + err);
                }
                deferred.reject();
            } else {
                if (debugB) {
                    console.log("found all documents with size: " + docs.length);
                }
                deferred.resolve(docs);
            }
        });
        return deferred.promise;
    }

    function findDocById(docId) {
        var deferred = q.defer();
        docModel.findOne({_id: docId}, function(err, doc) {
            if (err) {
                if (debugA) {
                    console.log("rejected while finding one: " + err);
                }
                deferred.reject();
            } else {
                if (debugB) {
                    console.log("found one doc: " + doc.title);
                }
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findDocByTime(startDate, endDate) {
        var deferred = q.defer();
        if (startDate == null) {
            startDate = new Date(2015, 12, 1);
        }
        if (endDate == null) {
            endDate = new Date();
        }
        docModel.find({
            $and: [
                {date: {$gte: startDate}},
                {date: {$lt: endDate}}
            ]
        }, function(err, docs) {
            if (err) {
                if (debugA) {
                    console.log("rejected while finding doc by time: " + startDate + " - " + endDate + " " + err);
                }
                deferred.reject();
            } else {
                if (debugB) {
                    console.log("found doc between the two date: " + startDate + " - " + endDate + " " + docs.length);
                }
                deferred.resolve(docs);
            }
        });
        return deferred.promise;
    }

    function findDocByTitle(title) {
        var deferred = q.defer();
        docModel.find({title: title}, function(err, docs) {
            if (err) {
                if (debugA) {
                    console.log("rejected while finding by title " + title + ": " + err);
                }
                deferred.reject();
            } else {
                if (debugB) {
                    console.log("found doc with title " + title + ": " + docs[0].title);
                }
                deferred.resolve(docs);
            }
        });
        return deferred.promise;
    }

    function addCommentIdToDoc(docId, commentId) {
        var deferred = q.defer();
        docModel.findOne({_id: docId}, function(err, doc) {
            if (err) {
                if (debugA) {
                    console.log("rejected while finding one: " + err);
                }
                deferred.reject();
            } else {
                if (debugB) {
                    console.log("found one doc: " + doc.title);
                }
                doc.comments.push(commentId);
                doc.save(function(err, newDoc) {
                    if (err) {
                        if (debugA) {
                            console.log("rejected while saving doc: " + err);
                        }
                        deferred.reject();
                    } else {
                        if (debugB) {
                            console.log("doc updated with new comment, now: " + doc.comments.length);
                        }
                        deferred.resolve(newDoc);
                    }
                });
            }
        });
        return deferred.promise;
    }

    function deleteCommentIdFromDoc(docId, commentId) {
        var deferred = q.defer();
        docModel.findOne({_id: docId}, function(err, doc) {
            if (err) {
                if (debugA) {
                    console.log("rejected while finding one: " + err);
                }
                deferred.reject();
            } else {
                if (debugB) {
                    console.log("found one doc: " + doc.title);
                }
                for (var i in doc.comments) {
                    if (doc.comments[i] === commentId) {
                        if (debugA) {
                            console.log("found comment " + doc.comments[i] + " and " + commentId);
                        }
                        doc.comments.splice(i, 1);
                    }
                }
                doc.save(function(err, newDoc) {
                    if (err) {
                        if (debugA) {
                            console.log("rejected while saving doc: " + err);
                        }
                        deferred.reject();
                    } else {
                        if (debugB) {
                            console.log("doc deleted one comment, now: " + doc.comments.length);
                        }
                        deferred.resolve(newDoc);
                    }
                });
            }
        });
        return deferred.promise;
    }

    function addTagIdToDoc(docId, tagId) {
        var deferred = q.defer();
        docModel.findOne({_id: docId}, function(err, doc) {
            if (err) {
                if (debugA) {
                    console.log("rejected while finding one: " + err);
                }
                deferred.reject();
            } else {
                if (debugB) {
                    console.log("found one doc: " + doc.title);
                }
                doc.tags.push(tagId);
                doc.save(function(err, newDoc) {
                    if (err) {
                        if (debugA) {
                            console.log("rejected while saving doc: " + err);
                        }
                        deferred.reject();
                    } else {
                        if (debugB) {
                            console.log("doc updated with new tag, now: " + doc.tags.length);
                        }
                        deferred.resolve(newDoc);
                    }
                });
            }
        });
        return deferred.promise;
    }

    function deleteTagIdFromDoc(docId, tagId) {
        var deferred = q.defer();
        docModel.findOne({_id: docId}, function(err, doc) {
            if (err) {
                if (debugA) {
                    console.log("rejected while finding one: " + err);
                }
                deferred.reject();
            } else {
                if (debugB) {
                    console.log("found one doc: " + doc.title);
                }
                for (var i in doc.tags) {
                    if (doc.tags[i] === tagId) {
                        if (debugA) {
                            console.log("found tag " + doc.tags[i] + " and " + tagId);
                        }
                        doc.tags.splice(i, 1);
                    }
                }
                doc.save(function(err, newDoc) {
                    if (err) {
                        if (debugA) {
                            console.log("rejected while saving doc: " + err);
                        }
                        deferred.reject();
                    } else {
                        if (debugB) {
                            console.log("doc deleted one tagId, now: " + newDoc.tags.length);
                        }
                        deferred.resolve(newDoc);
                    }
                });
            }
        });
        return deferred.promise;
    }

    function mergeTagInDoc(docId, oldTag, newTag) {
        var deferred = q.defer();
        docModel.findOne({_id: docId}, function(err, doc) {
            if (err) {
                if (debugA) {
                    console.log("rejected while finding one: " + err);
                }
                deferred.reject();
            } else {
                if (debugB) {
                    console.log("found one doc: " + doc.title);
                }
                for (var i in doc) {
                    if (doc.tags[i] == oldTag) {
                        doc.tags[i] = newTag;
                        break;
                    }
                }
                doc.save(function(err, newDoc) {
                    if (err) {
                        if (debugA) {
                            console.log("rejected while saving doc: " + err);
                        }
                        deferred.reject();
                    } else {
                        if (debugB) {
                            console.log("doc with tag id merged");
                        }
                        deferred.resolve(newDoc);
                    }
                });
            }
        });
    }

    function updateDocIdToTag(oldTags, newTags, docId) {
        // update the tags if needed, to tag model
        for (var i in oldTags) {
            var index = newTags.indexOf(oldTags[i]);
            if (index == -1) {
                tagModel.deleteDocIdFromTag(oldTags[i], docId).then(function(){});
            } else {
                newTags.splice(index, 1);
            }
        }
        for (var i in newTags) {
            tagModel.addDocIdToTag(newTags[i], docId).then(function(){});
        }
    }
};