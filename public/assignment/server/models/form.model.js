"use strict";
var q = require('q');

var uuid = require('uuid');

module.exports = function(app, mongoose) {
    var formSchema = require('./form.schema.js')(mongoose);
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
            .then(function(forms) {
                if (forms.length == 0) {
                    console.log("forms db empty");
                    for (var i in mockForm) {
                        createForm(mockForm[i], true)
                            .then(function(forms) {
                                console.log("Current forms size " + forms.length);
                            });
                    }
                }
            });
    }

    function updateFormByFormFieldId(formId, fieldId, field) {
        var deferred = q.defer();
        delete field.id;
        formModel.findOne({id: formId}, function(err, form) {
            if (err) {
                deferred.reject(err);
                console.log(err);
            } else {
                for (var i in form.fields) {
                    if (form.fields[i].id === fieldId) {
                        if (field.id) {
                            delete field.id;
                        }
                        for (var property in field) {
                            form.fields[i][property] = field[property];
                        }
                        form.save(function(err, form) {
                            if (err) {
                                deferred.reject(err);
                                console.log(err);
                            } else {
                                deferred.resolve(form.fields);
                            }
                        });
                        return deferred.promise;
                    }
                }
                deferred.resolve(null);
            }
        });

        return deferred.promise;
    }

    function createFieldByFormId(formId, field) {
        var deferred = q.defer();
        field.id = uuid.v4();
        formModel.findOne({id: formId}, function(err, form) {
            if (err) {
                deferred.reject(err);
                console.log(err);
            } else {
                form.fields.push(field);
                form.save(function(err, form) {
                    if (err) {
                        deferred.reject(err);
                        console.log(err);
                    } else {
                        deferred.resolve(form.fields);
                    }
                });
            }
        });

        return deferred.promise;
    }

    function deleteFieldByFormFieldId(formId, fieldId) {
        var deferred = q.defer();
        formModel.findOne({id: formId}, function(err, form) {
            if (err) {
                deferred.reject(err);
                console.log(err);
            } else {
                for (var i in form.fields) {
                    if (form.fields[i].id === fieldId) {
                        form.fields.splice(i, 1);
                        form.save(function(err, form) {
                            if (err) {
                                deferred.reject(err);
                                console.log(err);
                            } else {
                                deferred.resolve(form.fields);
                            }
                        });
                        return deferred.promise;
                    }
                }
                deferred.resolve(null);
            }
        });

        return deferred.promise;
    }

    function findFieldByFormFieldId(formId, fieldId) {
        var deferred = q.defer();
        formModel.findOne({id: formId}, function(err, form) {
            if (err) {
                deferred.reject(err);
                console.log(err);
            } else {
                for (var i in form.fields) {
                    if (form.fields[i].id === fieldId) {
                        deferred.resolve(form.fields[i]);
                        return deferred.promise;
                    }
                }
                deferred.resolve(null);
            }
        });

        return deferred.promise;
    }

    function findFieldByFormId(formId) {
        var deferred = q.defer();
        formModel.findOne({id: formId}, function(err, form) {
            if (err) {
                deferred.reject(err);
                console.log(err);
            } else {
                deferred.resolve(form.fields);
            }
        });

        return deferred.promise;
    }

    function findFormByUserId(userId) {
        var deferred = q.defer();
        formModel.find({userId: userId}, function(err, forms) {
            if (err) {
                deferred.reject(err);
                console.log(err);
            } else {
                deferred.resolve(forms);
            }
        });

        return deferred.promise;
    }

    function createForm(form, keepId) {
        var deferred = q.defer();
        if (!keepId) {
            form.id = uuid.v4();
        }
        formModel.create(form, function(err, forms) {
            if (err) {
                deferred.reject(err);
                console.log(err);
            } else {
                formModel.find(function(err, forms) {
                    if (err) {
                        deferred.reject(err);
                        console.log(err);
                    } else {
                        deferred.resolve(forms);
                    }
                });
            }
        });
        return deferred.promise;
    }

    function findAllForm() {
        var deferred = q.defer();
        formModel.find(function(err, form) {
            if (err) {
                deferred.reject(err);
                console.log(err);
            } else {
                deferred.resolve(form);
            }
        });

        return deferred.promise;
    }

    function findFormById(id) {
        var deferred = q.defer();
        formModel.findOne({id: id}, function(err, form) {
            if (err) {
                deferred.reject(err);
                console.log(err);
            } else {
                deferred.resolve(form);
            }
        });

        return deferred.promise;
    }

    function updateForm(id, form) {
        var deferred = q.defer();
        delete form._id;
        formModel.findOne({id: id}, function(err, oldForm) {
            if (err) {
                deferred.reject(err);
                console.log(err);
            } else {
                for (var i in form) {
                    oldForm[i] = form[i];
                }
                oldForm.save(function(err, newForm) {
                    if (err) {
                        deferred.reject(err);
                        console.log(err);
                    } else {
                        deferred.resolve(newForm);
                    }
                })
            }
        });

        return deferred.promise;
    }

    function deleteForm(id) {
        var deferred = q.defer();
        formModel.remove({id: id}, function(err, forms) {
            if (err) {
                deferred.reject(err);
                console.log(err);
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

        return deferred.promise;
    }

    function findFormByTitle(title) {
        var deferred = q.defer();
        formModel.findOne({title: title}, function(err, form) {
            if (err) {
                deferred.reject(err);
                console.log(err);
            } else {
                deferred.resolve(form);
            }
        });

        return deferred.promise;
    }
};
