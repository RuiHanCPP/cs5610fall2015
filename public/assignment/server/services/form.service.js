"use strict";
var q = require('q');
module.exports = function(app, model) {
    app.get("/api/assignment/user/:userId/form", getFormByUserId);
    app.get("/api/assignment/form/:formId", getFormByFormId);
    app.delete("/api/assignment/form/:formId", deleteFormByFormId);
    app.post("/api/assignment/user/:userId/form", createFormByUserId);
    app.put("/api/assignment/form/:formId", updateFormByFormId);

    function getFormByUserId(req, res) {
        model
            .findFormByUserId(req.params.userId)
            .then(function(forms) {
                res.json(forms);
            });
    }

    function getFormByFormId(req, res) {
        model
            .findFormById(req.params.formId)
            .then(function(form) {
                res.json(form);
            });
    }

    function createFormByUserId(req, res) {
        req.body.userId = req.params.userId;
        model
            .createForm(req.body)
            .then(function(forms) {
                res.json(forms);
            });
    }

    function updateFormByFormId(req, res) {
        model
            .updateForm(req.params.formId, req.body)
            .then(function(forms) {
                res.json(forms);
            });
    }

    function deleteFormByFormId(req, res) {
        model
            .deleteForm(req.params.formId)
            .then(function(forms) {
                res.json(forms);
            });
    }
};
