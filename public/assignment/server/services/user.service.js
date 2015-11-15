"use strict";
module.exports = function(app, model, db) {
    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", getUser);
    app.get("/api/assignment/user/:id", getUserById);
    app.put("/api/assignment/user/:id", updateUserById);
    app.delete("/api/assignment/user/:id", deleteUserById);

    function createUser(req, res) {
        model
            .createUser(req.body)
            .then(function(users) {
                res.json(users);
            })
    }

    function getUser(req, res) {
        if (req.query.username && req.query.password) {
            model
                .findUserByCredentials({
                    username: req.query.username,
                    password: req.query.password
                })
                .then(function(user) {
                    res.json(user);
                });
        } else if (req.query.username) {
            model
                .findUserByUsername(req.query.username)
                .then(function(user) {
                    res.json(user);
                });
        } else {
            model
                .findAllUser()
                .then(function(users) {
                    res.json(users);
                })
        }
    }

    function getUserById(req, res) {
        model
            .findUserById(req.params.id)
            .then(function(user) {
                res.json(user);
            })
    }

    function updateUserById(req, res) {
        model
            .updateUser(req.params.id, req.body)
            .then(function(users) {
                res.json(users);
            })
    }

    function deleteUserById(req, res) {
        model
            .deleteUser(req.params.id)
            .then(function(users) {
                res.json(users);
            })
    }
}
