"use strict";
var q = require('q');

module.exports = function(app, mongoose) {
    var initSuperUserData = {
        username: "Henry1324",
        password: "13848171229",
        email: "ruihancpp@gmail.com",
        selfDesc: "nothing for now, dummy data",
        isAdmin: true
    };
    var userSchema = require('./user.schema.js')(mongoose);
    var userModel = mongoose.model("userModel", userSchema);
    var debugA = true;
    var debugB = false;

    initSuperUser().then(function(userId) {
        if (userId == null) {
            console.log("super user id not updated after init!");
            process.exit(3);
        }
    });

    var apis = {
        findUserById: findUserById,
        findAllUser: findAllUser,
        findUserByCredential: findUserByCredential,
        findUserByUsername: findUserByUsername,
        findUserByEmail: findUserByEmail,
        updateUserById: updateUserById,
        createUser: createUser,
        deleteNewCommentById: deleteNewCommentById,
        addNewCommentById: addNewCommentById
    };

    return apis;

    function deleteNewCommentById(dId, uId) {
        var deferred = q.defer();
        userModel.findOne({_id: uId}, function(err, user) {
            if (err) {
                if (debugA) {
                    console.log("cannot get user by user id " + uId + " " + err);
                }
                deferred.reject();
            } else {
                if (user == null) {
                    if (debugA) {
                        console.log("found null by user id " + uId);
                    }
                    deferred.reject();
                } else {
                    for (var i = 0; i < user.newComments.length; ++i) {
                        if (user.newComments[i] == dId) {
                            user.newComments.splice(i, 1);
                            --i;
                        }
                    }
                    user.save(function(err, newUser) {
                        if (err) {
                            if (debugA) {
                                console.log("cannot save updated new user " + err);
                            }
                        } else {
                            deferred.resolve(newUser);
                        }
                    });
                }
            }
        });
        return deferred.promise;
    }

    function addNewCommentById(dId, uId) {
        var deferred = q.defer();
        userModel.findOne({_id: uId}, function(err, user) {
            if (err) {
                if (debugA) {
                    console.log("cannot get user by user id " + uId + " " + err);
                }
                deferred.reject();
            } else {
                if (user == null) {
                    if (debugA) {
                        console.log("found null by user id " + uId);
                    }
                    deferred.reject();
                } else {
                    if (user.newComments.indexOf(dId) == -1) {
                        user.newComments.push(dId);
                        user.save(function(err, newUser) {
                            if (err) {
                                if (debugA) {
                                    console.log("cannot save updated new user " + err);
                                }
                            } else {
                                deferred.resolve(newUser);
                            }
                        });
                    } else {
                        deferred.resolve(user);
                    }
                }
            }
        });
        return deferred.promise;
    }

    function initSuperUser() {
        var deferred = q.defer();
        userModel.find(function(err, users) {
            if (err) {
                if (debugA) {
                    console.log("cannot search for all super users " + err);
                    process.exit(1);
                }
            } else {
                if (users.length == 0) {
                    userModel.create(initSuperUserData, function(err, res) {
                        if (err) {
                            if (debugA) {
                                console.log("cannot create the init super user " + err);
                            }
                            process.exit(2);
                        } else {
                            userModel.find(function(err, users) {
                                if (err) {
                                    if (debugA) {
                                        console.log("cannot search all super users after create");
                                    }
                                    process.exit(3);
                                } else {
                                    deferred.resolve(users[0].id);
                                }
                            })
                        }
                    });
                }
            }
        });

        return deferred.promise;
    }

    function findUserById(uId) {
        var deferred = q.defer();
        userModel.findOne({_id: uId}, function(err, user) {
            if (err) {
                if (debugA) {
                    console.log("cannot find the user by id " + err);
                }
                deferred.reject();
            } else {
                if (debugB) {
                    console.log("find user by " + uId + " " + user);
                }
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    function findUserByUsername(username) {
        var deferred = q.defer();
        userModel.findOne({username: username}, function(err, user) {
            if (err) {
                if (debugA) {
                    console.log("cannot find the user by username " + err);
                }
                deferred.reject();
            } else {
                if (debugB) {
                    console.log("find user by " + username + " " + user);
                }
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    function findUserByEmail(email) {
        var deferred = q.defer();
        userModel.findOne({email: email}, function(err, user) {
            if (err) {
                if (debugA) {
                    console.log("cannot find the user by email " + err);
                }
                deferred.reject();
            } else {
                if (debugB) {
                    console.log("find user by " + email + " " + user);
                }
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    function findAllUser() {
        var deferred = q.defer();
        userModel.find(function(err, users) {
            if (err) {
                if (debugA) {
                    console.log("cannot find all the users" + err);
                }
                deferred.reject();
            } else {
                if (debugB) {
                    for (var i in users) {
                        userModel.findOne({_id: users[i].id}, function(err, user) {
                            console.log(err);
                            console.log(user);
                        });
                    }
                }
                deferred.resolve(users);
            }
        });
        return deferred.promise;
    }

    function findUserByCredential(username, password) {
        var deferred= q.defer();
        userModel.findOne({username: username, password: password}, function(err, user) {
            if (err) {
                if (debugA) {
                    console.log("cannot find user by username and password " + err);
                }
                deferred.reject();
            } else {
                if (debugB) {
                    console.log("found user " + user);
                }
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    function updateUserById(userId, user, adminId) {
        var deferred = q.defer();
        delete user._id;
        userModel.findOne({_id: adminId}, function(err, admin) {
            if (err) {
                if (debugA) {
                    console.log("cannot find the user by id " + err);
                }
                deferred.reject();
            } else {
                if (!admin || !admin.isAdmin) {
                    delete user.isAdmin;
                }
            }
        });
        userModel.findOne({_id: userId}, function(err, oldUser) {
            if (err) {
                if (debugA) {
                    console.log("cannot find the user by id " + err);
                }
                deferred.reject();
            } else {
                if (oldUser == null) {
                    if (debugA) {
                        console.log("error when finding user, no user was found");
                    }
                    deferred.reject();
                } else {
                    for (var property in user) {
                        oldUser[property] = user[property];
                    }
                    oldUser.save(function(err, newUser) {
                        if (err) {
                            if (debugA) {
                                console.log("cannot save updated new user " + err);
                            }
                        } else {
                            deferred.resolve(newUser);
                        }
                    });
                }
            }
        });

        return deferred.promise;
    }

    function createUser(user) {
        var deferred = q.defer();
        delete user._id;
        user.isAdmin = false;
        userModel
            .create(user, function(err, newUser) {
                if (err) {
                    if (debugA) {
                        console.log("cannot create the user " + err);
                    }
                    deferred.reject();
                } else {
                    deferred.resolve(newUser);
                }
            });
        return deferred.promise;
    }
};
