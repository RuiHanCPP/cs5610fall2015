"use strict";
var q = require('q');
var userSchema = require('./user.schema.js')(mongoose);

module.exports = function(app, mongoose) {
    var mockUsers = require('./user.mock.json');
    var userModel = mongoose.model("cs5610.assignment.user", userSchema);
    var apis = {
        createUser: createUser,
        findAllUser: findAllUser,
        findUserById: findUserById,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials
    };

    init();

    return apis;

    function init() {
        findAllUser()
            .then(function(users) {
                if (users.length == 0) {
                    for (var i in mockUsers) {
                        createUser(mockUsers[i])
                            .then(function(err, users) {
                                console.log(users);
                            });
                    }
                }
            });
    }

    function createUser(user) {
        var deferred = q.defer();
        userModel.create(user, function(err, users) {
            if (err) {
                deferred.reject(err);
            } else {
                userModel.find(function(err, users) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(users);
                    }
                });
            }
        });
        return deferred.promise();
    }

    function findAllUser() {
        var deferred = q.defer();
        userModel.find(function(err, users) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(users);
            }
        });

        return deferred.promise();
    }

    function findUserById(id) {
        var deferred = q.defer();
        userModel.findById(id, function(err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });
        return deferred.promise();
    }

    function updateUser(id, user) {
        var deferred = q.defer();
        if (user.id) {
            delete user.id;
        }
        userModel.findById(id, function(err, oldUser) {
            if (err) {
                deferred.reject(err);
            } else {
                for (var i in user) {
                    oldUser[i] = user[i];
                }
                oldUser.save(function(err, newUser) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(newUser);
                    }
                })
            }
        });
        return deferred.promise();
    }

    function deleteUser(id) {
        var deferred = q.defer();
        userModel.remove({_id: id}, function(err, users) {
            if (err) {
               deferred.reject(err);
            } else {
                userModel.find(function(err, users) {
                    if (err) {
                       deferred.reject(err);
                    } else {
                        userModel.find(function(err, users) {
                            if (err) {
                                deferred.reject(err);
                            } else {
                                deferred.resolve(users);
                            }
                        });
                    }
                });
            }
        });
        return deferred.promise();
    }

    function findUserByUsername(username) {
        var deferred = q.defer();
        deferred.findOne({username: username}, function(err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });
        return deferred.promise();
    }

    function findUserByCredentials(credentials) {
        var deferred = q.defer();
        userModel.findOne({username: credentials.username, password: credentials.password}, function(err, users) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(users);
            }
        });

        return deferred.promise();
    }
};
