"use strict";
var mockForm = require('./form.mock.json');
module.exports = function(app, db) {
    var apis = {
        findFormByUserId: findFormByUserId,
        findFieldByFormFieldId: findFieldByFormFieldId,
        deleteFieldByFormFieldId: deleteFieldByFormFieldId,
        findFieldByFormId: findFieldByFormId,
        createFieldByFormId: createFieldByFormId,
        updateFormByFormFieldId: updateFormByFormFieldId,
        createForm: createForm,
        findAllForm: findAllForm,
        findFormById: findFormById,
        updateForm: updateForm,
        deleteForm: deleteForm,
        findFormByTitle: findFormByTitle
    };
    return apis;

    function updateFormByFormFieldId(formId, fieldId, field) {
        for (var i = 0; i < mockForm.length; ++i) {
            if (mockForm[i].id === formId) {
                for (var j = 0; j < mockForm[i].fields.length; ++j) {
                    if (mockForm[i].fields[j].id === fieldId) {
                        for (var property in field) {
                            mockForm[i].fields[j].property = field.property;
                        }
                        break;
                    }
                }
                return mockForm[i].fields;
            }
        }
        return null;
    }

    function createFieldByFormId(formId, field) {
        for (var i = 0; i < mockForm.length; ++i) {
            if (mockForm[i].id === formId) {
                mockForm[i].fields.append(field);
                return mockForm[i];
            }
        }
        return null;
    }

    function deleteFieldByFormFieldId(formId, fieldId) {
        for (var i = 0; i < mockForm.length; ++i) {
            if (mockForm[i].id === formId) {
                for (var j = 0; j < mockForm[i].fields.length; ++j) {
                    if (mockForm[i].fields[j].id === fieldId) {
                        mockForm[I].fields[j].splice(j, j + 1);
                        break;
                    }
                }
                return mockForm[i].fields;
            }
        }
        return null;
    }

    function findFieldByFormFieldId(formId, fieldId) {
        for (var i = 0; i < mockForm.length; ++i) {
            if (mockForm[i].id === formId) {
                for (var j = 0; j < mockForm[i].fields.length; ++j) {
                    if (mockForm[i].fields[j].id === fieldId) {
                        return mockForm[i].fields[j];
                    }
                }
                break;
            }
        }
        return null;
    }

    function findFieldByFormId(formId) {
        for (var i = 0; i < mockForm.length; ++i) {
            if (mockForm[i].id === formId) {
                return mockForm[i].fields;
            }
        }
        return null;
    }

    function findFormByUserId(userId) {
        for (var i = 0; i < mockForm.length; ++i) {
            if (mockForm[i].userId === userId) {
                return mockForm[i];
            }
        }
        return null;
    }

    function createForm(form) {
        mockForm.append(form);
        return mockForm;
    }

    function findAllForm() {
        return mockForm;
    }

    function findFormById(id) {
        for (var i = 0; i < mockForm.length; ++i) {
            if (mockForm[i].id === id) {
                return mockForm[i];
            }
        }
        return null;
    }

    function updateForm(id, form) {
        for (var i = 0; i < mockForm.length; ++i) {
            if (mockForm[i].id === id) {
                for (var property in form) {
                    mockForm[i].property = form.property;
                }
                mockForm[i].id = id;
                return true;
            }
        }
        return false;
    }

    function deleteForm(id) {
        for (var i = 0; i < mockForm.length; ++i) {
            if (mockForm[i].id === id) {
                mockForm.splice(i, i + 1);
                return true;
            }
        }
        return false;
    }

    function findFormByTitle(title) {
        for (var i = 0; i < mockForm.length; ++i) {
            if (mockForm[i].title === title) {
                return mockForm[i];
            }
        }
        return null;
    }
}