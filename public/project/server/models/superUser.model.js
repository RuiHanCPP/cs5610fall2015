"use strict";
var q = require('q');

module.exports = function(mongoose) {
    var initSuperUserData = {
        username: "Henry1324",
        password: "13848171229",
        email: "ruihancpp@gmail.com",
        selfDesc: "nothing for now, dummy data"
    };
    var superUserSchema = require('./superUser.schema.js')(mongoose);
    var superUserModel = mongoose.model("superUserModel", superUserSchema);
    var debugA = true;
    var userId = null;

    initSuperUser();

    var apis = {
        getSuperUser: getSuperUser,
        updateUser: updateUser
    };

    return apis;

    function initSuperUser() {
        superUserModel.find(function(err, users) {
            if (err) {
                if (debugA) {
                    console.log("cannot search for all super users " + err);
                    process.exit(1);
                }
            } else {
                if (users.length == 0) {
                    superUserModel.create(initSuperUserData, function(err, res) {
                        if (err) {
                            if (debugA) {
                                console.log("cannot create the init super user " + err);
                            }
                            process.exit(2);
                        } else {
                            superUserModel.find(function(err, users) {
                                if (err) {
                                    if (debugA) {
                                        console.log("cannot search all super users after create");
                                    }
                                    process.exit(3);
                                } else {
                                    userId = users[0]._id;
                                }
                            })
                        }
                    });
                }
            }
        });

        if (userId == null) {
            console.log("super user id not updated!");
            proess.exit(3);
        }
    }

    function getSuperUser() {
        if (userId == null) {
            console.log("super user id not updated!");
            proess.exit(3);
        }
        var deferred = q.defer();
        superUserModel.findOne({_id: userId}, function(err, user) {
            if (err) {
                if (debugA) {
                    console.log("cannot find the super user by id " + err);
                }
                deferred.reject();
            } else {
                if (user == null) {
                    if (debugA) {
                        console.log("error when finding super user, no user was found");
                    }
                    deferred.reject();
                } else {
                    deferred.resolve(user);
                }
            }
        });
        return deferred.promise;
    }

    function updateUser(user) {
        if (userId == null) {
            console.log("super user id not updated!");
            proess.exit(3);
        }
        var deferred = q.defer();
        delete user._id;
        superUserModel.findOne({_id: userId}, function(err, oldUser) {
            if (err) {
                if (debugA) {
                    console.log("cannot find the super user by id " + err);
                }
                deferred.reject();
            } else {
                if (oldUser == null) {
                    if (debugA) {
                        console.log("error when finding super user, no user was found");
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
};
