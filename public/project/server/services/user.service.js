"use strict";
module.exports = function(app, userModel) {
    app.get("/api/project/user", getUser);
    app.get("/api/project/user/:id", getUserById);
    app.put("/api/project/user/:targetId/:uId", updateUserById);
    app.post("/api/project/user", createUser);
    app.delete("/api/project/user/:dId/:uId", deleteNewCommentById);
    app.post("/api/project/user/:dId/:uId", addNewCommentById);

    function deleteNewCommentById(req, res) {
        userModel
            .deleteNewCommentById(req.params.dId, req.params.uId)
            .then(function(user) {
                res.json(user);
            });
    }

    function addNewCommentById(req, res) {
        userModel
            .addNewCommentById(req.params.dId, req.params.uId)
            .then(function(user) {
                res.json(user);
            });
    }

    function getUser(req, res) {
        if (req.query.username && req.query.password) {
            userModel
                .findUserByCredential(req.query.username, req.query.password)
                .then(function(user) {
                    res.json(user);
                });
        } else if (req.query.email) {
            userModel
                .findUserByEmail(req.query.email)
                .then(function(user) {
                    res.json(user);
                });
        } else if (req.query.username) {
            userModel
                .findUserByUsername(req.query.username)
                .then(function(user) {
                    res.json(user);
                });
        } else {
            userModel
                .findAllUser()
                .then(function(user) {
                    res.json(user);
                });
        }
    }
    function getUserById(req, res) {
        userModel
            .findUserById(req.params.id)
            .then(function(user) {
                res.json(user);
            });
    }

    function updateUserById(req, res) {
        userModel
            .updateUserById(req.params.targetId, req.body, req.params.uId)
            .then(function(user) {
                res.json(user);
            });
    }

    function createUser(req, res) {
        userModel
            .createUser(req.body)
            .then(function(user) {
                res.json(user);
            });
    }
};
