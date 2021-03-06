"use strict";
(function() {
    angular
        .module("FormBuilderApp")
        .factory("FieldService", FieldService);

    function FieldService($http, $q) {
        var fieldService = {
            createFieldForForm : createFieldForForm,
            getFieldsForForm : getFieldsForForm,
            getFieldForForm : getFieldForForm,
            deleteFieldFromForm: deleteFieldFromForm,
            updateField : updateField
        };
        return fieldService;

        function createFieldForForm(formId, field) {
            var deferred = $q.defer();

            $http.post("/api/assignment/form/" + formId + "/field", field)
                .success(function(response) {
                    // all fields
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function getFieldsForForm(formId) {
            var deferred = $q.defer();

            $http.get("/api/assignment/form/" + formId + "/field")
                .success(function(response) {
                    // all fields
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function getFieldForForm(formId, fieldId) {
            var deferred = $q.defer();

            $http.get("/api/assignment/form/" + formId + "/field/" + fieldId)
                .success(function(response) {
                    // one field
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function deleteFieldFromForm(formId, fieldId) {
            var deferred = $q.defer();

            $http.delete("/api/assignment/form/" + formId + "/field/" + fieldId)
                .success(function(response) {
                    // remaining fields
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function updateField(formId, fieldId, field) {
            var deferred = $q.defer();

            $http.put("/api/assignment/form/" + formId + "/field/" + fieldId, field)
                .success(function(response) {
                    // fields
                    deferred.resolve(response);
                });

            return deferred.promise;
        }
    }
})();