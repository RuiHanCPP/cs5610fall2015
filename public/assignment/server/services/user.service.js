"use strict";
module.exports = function(app, model, db) {
    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", getUser);
    app.get("/api/assignment/user/:id", getUserById);
    app.put("/api/assignment/user/:id", updateUserById);
    app.delete("/api/assignment/user/:id", deleteUserById);

    var uuid = require('uuid');

    function createUser(req, res) {
        var user = req.body;
        user.id = uuid.v4();
        res.json(model.createUser(user));
        /*
        model
            .createUser(user)
            .then(function(users) {
                res.json(users);
            })
            */
    }

    function getUser(req, res) {
        if (req.query.username && req.query.password) {
            res.json(model.findUserByCredentials({
                username: req.query.username,
                password: req.query.password
            }));
            /*
            model
                .findUserByCredentials({
                    username: req.query.username,
                    password: req.query.password
                })
                .then(function(user) {
                    res.json(user);
                });
                */
        } else if (req.query.username) {
            res.json(model.findUserByUsername(req.query.username));
            /*
            model
                .findUserByUsername(req.query.username)
                .then(function(user) {
                    res.json(user);
                });
                */
        } else {
            res.json(model.findAllUser());
            /*
            model
                .findAllUser()
                .then(function(users) {
                    res.json(users);
                })
                */
        }
    }

    function getUserById(req, res) {
        res.json(model.findUserById(req.params.id));
        /*
        model
            .findUserById(req.params.id)
            .then(function(user) {
                res.json(user);
            })
            */
    }

    function updateUserById(req, res) {
        res.json(model.updateUser(req.params.id, req.body));
        /*
        model
            .updateUser(req.params.id, req.body)
            .then(function(users) {
                res.json(users);
            })
            */
    }

    function deleteUserById(req, res) {
        res.json(model.deleteUser(req.params.id));
        /*
        model
            .deleteUser(req.params.id)
            .then(function(users) {
                res.json(users);
            })
            */
    }
}
