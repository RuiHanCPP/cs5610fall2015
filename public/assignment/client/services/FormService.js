"use strict";
(function() {
	angular
		.module("FormBuilderApp")
		.factory("FormService", FormService);

	function FormService($http, $q) {
		var formService = {
            findFormById : findFormById,
			createFormForUser : createFormForUser,
			findAllFormForUser : findAllFormForUser,
			deleteFormById : deleteFormById,
			updateFormById : updateFormById
		};
		return formService;

        function findFormById(formId) {
            var deferred = $q.defer();
            $http.get("/api/assignment/form/" + formId)
                .success(function(form) {
                    deferred.resolve(form);
                });
            return deferred.promise;
        }

		function createFormForUser(userId, form) {
            var deferred = $q.defer();

            $http.post("/api/assignment/user/" + userId + "/form", form)
                .success(function(response) {
                    // all forms
                    deferred.resolve(response);
                });

            return deferred.promise;
		}

		function findAllFormForUser(userId) {
            var deferred = $q.defer();

            $http.get("/api/assignment/user/" + userId + "/form")
                .success(function(response) {
                    // forms of a user
                    deferred.resolve(response);
                });

            return deferred.promise;
		}

		function deleteFormById(formId) {
            var deferred = $q.defer();

            $http.delete("/api/assignment/form/" + formId)
                .success(function(response) {
                    // all remaining forms
                    deferred.resolve(response);
                });

            return deferred.promise;
		}

		function updateFormById(formId, newForm) {
            var deferred = $q.defer();

            $http.put("/api/assignment/form/" + formId, newForm)
                .success(function(response) {
                    // all forms
                    deferred.resolve(response);
                });

            return deferred.promise;
		}
	}
})();