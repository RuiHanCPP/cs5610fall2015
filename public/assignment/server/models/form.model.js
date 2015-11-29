"use strict";
var q = require('q');
var formSchema = require('./form.schema.js')(mongoose);

module.exports = function(app, mongoose) {
    var mockForm = require('./form.mock.json');
    var formModel = mongoose.model("cs5610.assignment.form", formSchema);
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

    init();

    return apis;

    function init() {
        findAllForm()
            .then(function(users) {
                if (users.length == 0) {
                    for (var i in mockForm) {
                        createUser(mockForm[i])
                            .then(function(err, users) {
                                console.log(users);
                            });
                    }
                }
            });
    }

    function updateFormByFormFieldId(formId, fieldId, field) {
        var deferred = q.defer();
        formModel.findById(formId, function(err, form) {
            if (err) {
                deferred.reject(err);
            } else {
                for (var i in form.fields) {
                    if (form.fields[i].fieldId === fieldId) {
                        if (field.id) {
                            delete field.id;
                        }
                        for (var property in field) {
                            form.fields[i][property] = field[property];
                        }
                        form.save(function(err, form) {
                            if (err) {
                                deferred.reject(err);
                            } else {
                                deferred.resolve(form.fields);
                            }
                        });
                        return deferred.promise();
                    }
                }
                deferred.resolve(null);
            }
        });

        return deferred.promise();
    }

    function createFieldByFormId(formId, field) {
        var deferred = q.defer();
        formModel.findById(formId, function(err, form) {
            if (err) {
                deferred.reject(err);
            } else {
                form.fields.push(field);
                form.save(function(err, form) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(form.fields);
                    }
                });
            }
        });

        return deferred.promise();
    }

    function deleteFieldByFormFieldId(formId, fieldId) {
        var deferred = q.defer();
        formModel.findById(formId, function(err, form) {
            if (err) {
                deferred.reject(err);
            } else {
                for (var i in form.fields) {
                    if (form.fields[i].fieldId === fieldId) {
                        form.fields.splice(i, 1);
                        form.save(function(err, form) {
                            if (err) {
                                deferred.reject(err);
                            } else {
                                deferred.resolve(form.fields);
                            }
                        });
                        return deferred.promise();
                    }
                }
                deferred.resolve(null);
            }
        });

        return deferred.promise();
    }

    function findFieldByFormFieldId(formId, fieldId) {
        var deferred = q.defer();
        formModel.findById(formId, function(err, form) {
            if (err) {
                deferred.reject(err);
            } else {
                for (var i in form.fields) {
                    if (form.fields[i].fieldId === fieldId) {
                        deferred.resolve(form.fields[i]);
                        return deferred.promise();
                    }
                }
                deferred.resolve(null);
            }
        });

        return deferred.promise();
    }

    function findFieldByFormId(formId) {
        var deferred = q.defer();
        formModel.findById(formId, function(err, form) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(form.fields);
            }
        });

        return deferred.promise();
    }

    function findFormByUserId(userId) {
        var deferred = q.defer();
        formModel.find({userId: userId}, function(err, forms) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(forms);
            }
        });

        return deferred.promise();
    }

    function createForm(form) {
        var deferred = q.defer();
        formModel.create(form, function(err, forms) {
            if (err) {
                deferred.reject(err);
            } else {
                formModel.find(function(err, forms) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(forms);
                    }
                });
            }
        });
        return deferred.promise();
    }

    function findAllForm() {
        var deferred = q.defer();
        formModel.find(function(err, form) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(form);
            }
        });

        return deferred.promise();
    }

    function findFormById(id) {
        var deferred = q.defer();
        formModel.findById(id, function(err, form) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(form);
            }
        });

        return deferred.promise();
    }

    function updateForm(id, form) {
        var deferred = q.defer();
        if (form.id) {
            delete form.id;
        }
        formModel.findById(id, function(err, oldForm) {
            if (err) {
                deferred.reject(err);
            } else {
                for (var i in form) {
                    oldForm[i] = form[i];
                }
                oldForm.save(function(err, newForm) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(newForm);
                    }
                })
            }
        });

        return deferred.promise();
    }

    function deleteForm(id) {
        var deferred = q.defer();
        formModel.remove({_id: id}, function(err, forms) {
            if (err) {
                deferred.reject(err);
            } else {
                formModel.find(function(err, forms) {
                    if (err) {
                        deferred.reject();
                    } else {
                        deferred.resolve(forms);
                    }
                });
            }
        });

        return deferred.promise();
    }

    function findFormByTitle(title) {
        var deferred = q.defer();
        formModel.findOne({title: title}, function(err, form) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(form);
            }
        });

        return deferred.promise();
    }
};
