"use strict";
var q = require('q');

module.exports = function(app, mongoose) {
    var docSchema = require('./document.schema.js')(mongoose);
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
        findDocByTags: findDocByTags,
        findDocByUserId: findDocByUserId,
        findDocByRandom: findDocByRandom,
        mergeTagInDoc: mergeTagInDoc,
        addCommentIdToDoc: addCommentIdToDoc,
        deleteCommentIdFromDoc: deleteCommentIdFromDoc
    };

    return apis;

    function createDoc(document) {
        delete document.id;
        var deferred = q.defer();
        document.date = new Date();
        document.tags.sort();
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
                deferred.resolve(newDoc);
            }
        });
        return deferred.promise;
    }

    function deleteDoc(docId) {
        var deferred = q.defer();
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
        delete document.comments;
        delete document.userId;
        document.date = new Date();
        document.tags.sort();
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
                if (doc) {
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
                        }
                    });
                }
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
            startDate = new Date(0);
        } else {
            startDate = new Date(startDate);
        }
        if (endDate == null) {
            endDate = new Date();
        } else {
            endDate = new Date(endDate);
        }

        docModel.find({date: {$gte: startDate, $lte: endDate}}, function(err, docs) {
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

    function findDocByRandom() {
        var deferred = q.defer();
        docModel.findRandom().limit(1).exec(function (err, docs) {
            if (docs.length > 0) {
                deferred.resolve(docs[0]);
            } else {
                deferred.resolve(null);
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
                    console.log("found one doc when merging: " + doc.title);
                }
                for (var i in doc.tags) {
                    if (doc.tags[i] == oldTag) {
                        doc.tags[i] = newTag;
                    } else if (doc.tags[i] == newTag) {
                        doc.tags.splice(i, 1);
                    }
                }
                doc.tags.sort();
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
        return deferred.promise;
    }

    function findDocByTags(tagIds) {
        var deferred = q.defer();
        var foundDocs = [];
        tagIds.sort();
        docModel.find(function(err, docs) {
            if (err) {
                if (debugA) {
                    console.log("cannot find all docs when find by tag " + err);
                }
                deferred.reject();
            } else {
                if (debugB) {
                    console.log("found all " + docs.length + " docs");
                }
                for (var i in docs) {
                    var numOfMatch = 0;
                    var j, k;
                    for (j = 0, k = 0; j < docs[i].tags.length && k < tagIds.length;) {
                        if (docs[i].tags[j] < tagIds[k]) {
                            ++j;
                        } else if (docs[i].tags[j] > tagIds[k]) {
                            break;
                        } else {
                            ++numOfMatch;
                            ++j;
                            ++k;
                        }
                    }
                    if (numOfMatch == tagIds.length) {
                        foundDocs.push(docs[i]);
                    }
                }
                deferred.resolve(foundDocs);
            }
        });
        return deferred.promise;
    }

    function findDocByUserId(userId) {
        var deferred = q.defer();
        docModel.find({userId: userId}, function(err, docs) {
            if (err) {
                if (debugA) {
                    console.log("cannot find all docs when find by user " + err);
                }
                deferred.reject();
            } else {
                if (debugB) {
                    console.log("found all " + docs.length + " docs");
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
                            console.log("doc updated with new comment, now: " + newDoc.comments.length);
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
                            console.log("doc deleted one comment, now: " + newDoc.comments.length);
                        }
                        deferred.resolve(newDoc);
                    }
                });
            }
        });
        return deferred.promise;
    }
};