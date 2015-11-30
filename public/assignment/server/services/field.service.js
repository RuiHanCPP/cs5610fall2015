"use strict";
var q = require('q');
module.exports = function(app, model) {
    app.get("/api/assignment/form/:formId/field", getFieldByFormId);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldByFormFieldId);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldByFormFieldId);
    app.post("/api/assignment/form/:formId/field", createFieldByFormId);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldByFormFieldId);

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
        model
            .createFieldByFormId(req.params.formId, req.body)
            .then(function(fields) {
                res.json(fields);
            })
    }

    function updateFieldByFormFieldId(req, res) {
        model
            .updateFormByFormFieldId(req.params.formId, req.params.fieldId, req.body)
            .then(function(fields) {
                res.json(fields);
            })
    }
};

