"use strict";
var q = require('q');

module.exports = function(app, mongoose) {
    var tagSchema = require('./tag.schema.js')(mongoose);
    var tagModel = mongoose.model('tagModel', tagSchema);
    var debugA = true;
    var debugB = false;

    var apis = {
        createTag: createTag,
        deleteTag: deleteTag,
        findAllTags: findAllTags,
        findTagById: findTagById,
        updateTagName: updateTagName,
    };

    return apis;

    function createTag(tag) {
        delete tag.id;
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
        tagModel.remove({_id: tagId}, function(err, respond) {
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
                            console.log("tag name updated, now: " + newTag.tagName);
                        }
                        deferred.resolve(newTag);
                    }
                });
            }
        });
        return deferred.promise;
    }
};
