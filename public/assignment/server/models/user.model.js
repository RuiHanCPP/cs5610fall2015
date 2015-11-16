"use strict";

module.exports = function(app, db) {
    var mockUser = require('./user.mock.json');
    var apis = {
        createUser: createUser,
        findAllUser: findAllUser,
        findUserById: findUserById,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials
    };
    return apis;

    function createUser(user) {
        mockUser.push(user);
        return mockUser;
    }

    function findAllUser() {
        return mockUser;
    }

    function findUserById(id) {
        for (var i = 0; i < mockUser.length; ++i) {
            if (mockUser[i].id === id) {
                return mockUser[i];
            }
        }
        return null;
    }

    function updateUser(id, user) {
        for (var i = 0; i < mockUser.length; ++i) {
            if (mockUser[i].id === id) {
                for (var property in user) {
                    mockUser[i][property] = user[property];
                }
                mockUser[i].id = id;
                return mockUser;
            }
        }
        return mockUser;
    }

    function deleteUser(id) {
        for (var i = 0; i < mockUser.length; ++i) {
            if (mockUser[i].id === id) {
                mockUser.splice(i, 1);
                return mockUser;
            }
        }
        return mockUser;
    }

    function findUserByUsername(username) {
        for (var i = 0; i < mockUser.length; ++i) {
            if (mockUser[i].username === username) {
                return mockUser[i];
            }
        }
        return null;
    }

    function findUserByCredentials(credentials) {
        for (var i = 0; i < mockUser.length; ++i) {
            if (mockUser[i].username === credentials.username &&
                mockUser[i].password === credentials.password) {
                return mockUser[i];
            }
        }
        return null;
    }
}
