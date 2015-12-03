"use strict";
var q = require('q');

module.exports = function(app, mongoose) {
    var tagSchema = require('./tag.schema.js');
    var tagModel = mongoose.model('tagModel', tagSchema);
    var docModel = require('./document.model.js');
    var debugA = true;
    var debugB = false;

    var apis = {
        createTag: createTag,
        deleteTag: deleteTag,
        findAllTags: findAllTags,
        findTagById: findTagById,
        findTagByName: findTagByName,
        addDocIdToTag: addDocIdToTag,
        deleteDocIdFromTag: deleteDocIdFromTag,
        updateTagName: updateTagName,
        mergeTags: mergeTags
    };

    return apis;

    function createTag(tag) {
        delete tag._id;
        var deferred = q.defer();
        tagModel.create(tag, function(err, newTag) {
            if (err) {
                if (debugA) {
                    console.log("rejected while creating: " + err);
                }
                deferred.reject();
            } else {
                deferred.resolve(newTag);
                if (debugB) {
                    console.log("get new tag " + newTag.tagName);
                }
                deferred.resolve(newTag);
            }
        });
        return deferred.promise;
    }

    function deleteTag(tagId) {
        var deferred = q.defer();
        tagModel.delete({_id: tagId}, function(err, respond) {
            if (err) {
                if (debugA) {
                    console.log("rejected while deleting: " + err);
                }
                deferred.reject();
            } else {
                tagModel.find(function(err, tags) {
                    if (err) {
                        if (debugA) {
                            console.log("rejected while finding all: " + err);
                        }
                        deferred.reject(err);
                    } else {
                        if (debugB) {
                            console.log("cur size of tags " + tags.length);
                        }
                        deferred.resolve(tags.length);
                    }
                });
            }
        });
        return deferred.promise;
    }

    function findAllTags() {
        var deferred = q.defer();
        tagModel.find(function(err, tags) {
            if (err) {
                if (debugA) {
                    console.log("rejected while finding all: " + err);
                }
                deferred.reject();
            } else {
                if (debugB) {
                    console.log("found all tags with size: " + tags.length);
                }
                deferred.resolve(tags);
            }
        });
        return deferred.promise;
    }

    function findTagById(tagId) {
        var deferred = q.defer();
        tagModel.findOne({_id: tagId}, function(err, tag) {
            if (err) {
                if (debugA) {
                    console.log("rejected while finding one: " + err);
                }
                deferred.reject();
            } else {
                if (debugB) {
                    console.log("found one tag: " + tag.tagName);
                }
                deferred.resolve(tag);
            }
        });
        return deferred.promise;
    }

    function findTagByName(name) {
        var deferred = q.defer();
        tagModel.findOne({tagName: name}, function(err, tag) {
            if (err) {
                if (debugA) {
                    console.log("rejected while finding by tag name " +  name + ": " + err);
                }
                deferred.reject();
            } else {
                if (debugB) {
                    console.log("found doc with title " + name + ": " + tag.tagName);
                }
                deferred.resolve(tag);
            }
        });
        return deferred.promise;
    }

    function addDocIdToTag(tagId, docId) {
        var deferred = q.defer();
        tagModel.findOne({_id: tagId}, function(err, tag) {
            if (err) {
                if (debugA) {
                    console.log("rejected while finding one: " + err);
                }
                deferred.reject();
            } else {
                if (debugB) {
                    console.log("found one tag: " + tag.tagName);
                }
                tag.docIds.push(docId);
                tag.save(function(err, newTag) {
                    if (err) {
                        if (debugA) {
                            console.log("rejected while saving tag: " + err);
                        }
                        deferred.reject();
                    } else {
                        if (debugB) {
                            console.log("tag updated with new document, now: " + tag.docIds.length);
                        }
                        deferred.resolve(newTag);
                    }
                });
            }
        });
        return deferred.promise;
    }

    function deleteDocIdFromTag(tagId, docId) {
        var deferred = q.defer();
        tagModel.findOne({_id: tagId}, function(err, tag) {
            if (err) {
                if (debugA) {
                    console.log("rejected while finding one: " + err);
                }
                deferred.reject();
            } else {
                if (debugB) {
                    console.log("found one tag: " + tag.tagName);
                }
                for (var i in tag.docIds) {
                    if (tag.docIds[i] === docId) {
                        if (debugA) {
                            console.log("found document " + tag.docIds[i] + " and " + docId);
                        }
                        tag.docIds.splice(i, 1);
                    }
                }
                tag.save(function(err, newTag) {
                    if (err) {
                        if (debugA) {
                            console.log("rejected while saving tag: " + err);
                        }
                        deferred.reject();
                    } else {
                        if (debugB) {
                            console.log("tag deleted one docId, now: " + tag.docIds.length);
                        }
                        deferred.resolve(newTag);
                    }
                });
            }
        });
        return deferred.promise;
    }

    function updateTagName(tagId, tagName) {
        var deferred = q.defer();
        tagModel.findOne({_id: tagId}, function(err, tag) {
            if (err) {
                if (debugA) {
                    console.log("rejected while finding one: " + err);
                }
                deferred.reject();
            } else {
                if (debugB) {
                    console.log("found one tag: " + tag.tagName);
                }
                tag.tagName = tagName;
                tag.save(function(err, newTag) {
                    if (err) {
                        if (debugA) {
                            console.log("rejected while saving tag: " + err);
                        }
                        deferred.reject();
                    } else {
                        if (debugB) {
                            console.log("tag name updated, now: " + tag.tagName);
                        }
                        deferred.resolve(newTag);
                    }
                });
            }
        });
        return deferred.promise;
    }

    function mergeTags(tagIdA, tagIdB, newName) {
        var deferred = q.defer();
        findTagById(tagIdA)
            .then(function(tagA) {
                findTagById((tagIdB))
                    .then(function(tagB) {
                        for (var i in tagB.docIds) {
                            tagA.docIds.push(tagB.docIds[i]);
                            docModel.mergeTagInDoc(tagB.docIds[i], tagIdB, tagIdA).then(function(res){});
                        }
                    });
                tagA.tagName = newName;
                tagA.save(function(err, newTag) {
                    if (err) {
                        if (debugA) {
                            console.log("rejected while saving the merged tag: " + err);
                        }
                        deferred.reject();
                    } else {
                        if (debugB) {
                            console.log(tagIdA + " and " + tagIdB + " have been merged with new name " + newTag.tagName);
                        }
                        deferred.resolve(newTag);
                    }
                });
            });
        return deferred.promise;
    }

};
