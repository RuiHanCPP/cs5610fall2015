"use strict";
module.exports = function(app, model, db) {
    app.get("/api/assignment/user/:userId/form", getFormByUserId);
    app.get("/api/assignment/form/:formId", getFormByFormId);
    app.delete("/api/assignment/form/:formId", deleteFormByFormId);
    app.post("/api/assignment/user/:userId/form", createFormByUserId);
    app.put("/api/assignment/form/:formId", updateFormByFormId);

    var uuid = require('uuid');

    function getFormByUserId(req, res) {
        res.json(model.findFormByUserId(req.params.userId));
        /*
        model
            .findFormByUserId(req.params.userId)
            .then(function(forms) {
                res.json(forms);
            })
            */
    }

    function getFormByFormId(req, res) {
        res.json(model.findFormById(req.params.formId));
        /*
        model
            .findFormById(req.params.formId)
            .then(function(form) {
                res.json(form);
            })
            */
    }

    function createFormByUserId(req, res) {
        req.body.id = uuid.v1();
        req.body.userId = req.params.userId;
        res.json(model.createForm(req.body));
        /*
        model
            .createUser(req.body)
            .then(function(forms) {
                res.json(forms);
            })
            */
    }

    function updateFormByFormId(req, res) {
        res.json(model.updateForm(req.params.formId, req.body));
        /*
        model
            .updateUser(req.params.formId, req.body)
            .then(function(forms) {
                res.json(forms);
            })
            */
    }

    function deleteFormByFormId(req, res) {
        res.json(model.deleteForm(req.params.formId));
        /*
        model
            .deleteUser(req.params.formId)
            .then(function(forms) {
                res.json(forms);
            })
            */
    }
}
