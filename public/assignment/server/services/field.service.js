"use strict";
module.exports = function(app, model, db) {
    app.get("/api/assignment/form/:formId/field", getFieldByFormId);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldByFormFieldId);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldByFormFieldId);
    app.post("/api/assignment/form/:formId/field", createFieldByFormId);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldByFormFieldId);

    uuid = require('uuid');

    function getFieldByFormId(req, res) {
        model
            .findFieldByFormId(req.params.formId)
            .then(function(fields) {
                res.json(fields);
            })
    }

    function getFieldByFormFieldId(req, res) {
        model
            .findFieldByFormFieldId(req.params.formId, req.params.fieldId)
            .then(function(field) {
                res.json(field);
            })
    }

    function deleteFieldByFormFieldId(req, res) {
        model
            .deleteFieldByFormFieldId(req.params.formId, req.params.fieldId)
            .then(function(fields) {
                res.json(fields);
            })
    }

    function createFieldByFormId(req, res) {
        req.body.id = uuid.v1();
        req.body.userId = req.params.formId;
        model
            .createFieldByFormId(req.body)
            .then(function(fields) {
                res.json(fields);
            })
    }

    function updateFieldByFormFieldId(req, res) {
        model
            .updateUser(req.params.formId, req.body)
            .then(function(forms) {
                res.json(forms);
            })
    }
}

