"use strict";
var q = require('q');

module.exports = function(app, mongoose) {
    var tagSchema = require('./tag.schema.js');
    var tagModel = mongoose.model('tagModel', tagSchema);
    var debugA = true;
    var debugB = false;

    var apis = {
        createTag: createTag,
        deleteTag: deleteTag,
        findAllTags: findAllTags,
        findTagById: findTagById,
        findTagByName: findTagByName,
        addDocIToTag: addDocIToTag,
        deleteDocIdFromTag: deleteDocIdFromTag,
        addChildTag: addChildTag,
        deleteChildTag: deleteChildTag,
        updateParentTagId: updateParentTagId,
        updateTagName: updateTagName
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

    function addDocIToTag(tagId, docId) {
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

    function addChildTag(tagId, childTagId) {
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
                tag.childTagIds.push(childTagId);
                tag.save(function(err, newTag) {
                    if (err) {
                        if (debugA) {
                            console.log("rejected while saving tag: " + err);
                        }
                        deferred.reject();
                    } else {
                        if (debugB) {
                            console.log("tag updated with new child tag, now: " + tag.childTagIds.length);
                        }
                        deferred.resolve(newTag);
                    }
                });
            }
        });
        return deferred.promise;
    }

    function deleteChildTag(tagId, childTagId) {
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
                for (var i in tag.childTagIds) {
                    if (tag.childTagIds[i] === childTagId) {
                        if (debugA) {
                            console.log("found document " + tag.childTagIds[i] + " and " + childTagId);
                        }
                        tag.childTagIds.splice(i, 1);
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
                            console.log("tag deleted one child tag, now: " + tag.childTagIds.length);
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

    function updateParentTagId(tagId, parentId) {
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
                tag.parentTagId = parentId;
                tag.save(function(err, newTag) {
                    if (err) {
                        if (debugA) {
                            console.log("rejected while saving tag: " + err);
                        }
                        deferred.reject();
                    } else {
                        if (debugB) {
                            console.log("tag parent updated, now: " + tag.parentTagId);
                        }
                        deferred.resolve(newTag);
                    }
                });
            }
        });
        return deferred.promise;
    }
};
