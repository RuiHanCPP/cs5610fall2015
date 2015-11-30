"use strict";
var q = require('q');

var uuid = require('uuid');

module.exports = function(app, mongoose) {

    var userSchema = require('./user.schema.js')(mongoose);

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
                    console.log("users db empty");
                    for (var i in mockUsers) {
                        createUser(mockUsers[i], true)
                            .then(function(users) {
                                console.log("Current users size " + users.length);
                            });
                    }
                }
            });
    }

    function createUser(user, keepId) {
        var deferred = q.defer();
        if (!keepId) {
            user.id = uuid.v4();
        }
        userModel.create(user, function(err, users) {
            if (err) {
                deferred.reject(err);
                console.log(err);
            } else {
                userModel.find(function(err, users) {
                    if (err) {
                        deferred.reject(err);
                        console.log(err);
                    } else {
                        deferred.resolve(users);
                    }
                });
            }
        });
        return deferred.promise;
    }

    function findAllUser() {
        var deferred = q.defer();
        userModel.find(function(err, users) {
            if (err) {
                deferred.reject(err);
                console.log(err);
            } else {
                deferred.resolve(users);
            }
        });

        return deferred.promise;
    }

    function findUserById(id) {
        var deferred = q.defer();
        userModel.findOne({id: id}, function(err, user) {
            if (err) {
                deferred.reject(err);
                console.log(err);
            } else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    function updateUser(id, user) {
        var deferred = q.defer();
        delete user.id;
        userModel.findOne({id: id}, function(err, oldUser) {
            if (err) {
                deferred.reject(err);
                console.log(err);
            } else {
                for (var i in user) {
                    oldUser[i] = user[i];
                }
                oldUser.save(function(err, newUser) {
                    if (err) {
                        deferred.reject(err);
                        console.log(err);
                    } else {
                        deferred.resolve(newUser);
                    }
                })
            }
        });
        return deferred.promise;
    }

    function deleteUser(id) {
        var deferred = q.defer();
        userModel.remove({id: id}, function(err, users) {
            if (err) {
                deferred.reject(err);
                console.log(err);
            } else {
                userModel.find(function(err, users) {
                    if (err) {
                        deferred.reject(err);
                        console.log(err);
                    } else {
                        userModel.find(function(err, users) {
                            if (err) {
                                deferred.reject(err);
                                console.log(err);
                            } else {
                                deferred.resolve(users);
                            }
                        });
                    }
                });
            }
        });
        return deferred.promise;
    }

    function findUserByUsername(username) {
        var deferred = q.defer();
        deferred.findOne({username: username}, function(err, user) {
            if (err) {
                deferred.reject(err);
                console.log(err);
            } else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    function findUserByCredentials(credentials) {
        var deferred = q.defer();
        userModel.findOne({username: credentials.username, password: credentials.password}, function(err, user) {
            if (err) {
                deferred.reject(err);
                console.log(err);
            } else {
                console.log(user);
                deferred.resolve(user);
            }
        });

        return deferred.promise;
    }
};
