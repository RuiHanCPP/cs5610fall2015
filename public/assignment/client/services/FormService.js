"use strict";
(function() {
	angular
		.module("FormBuilderApp")
		.factory("FormService", FormService);

	function FormService($http, $q) {
		var forms = [];
		var formService = {
			createFormForUser : createFormForUser,
			findAllFormForUser : findAllFormForUser,
			deleteFormById : deleteFormById,
			updateFormById : updateFormById
		};
		return formService;

		function createFormForUser(userId, form) {
            var deferred = $q.defer();

            $http.post("/api/assignment/user/" + userId + "/form", form)
                .success(function(response) {
                    deferred.resolve(response);
                });

            return deferred.promise();
		}

		function findAllFormForUser(userId) {
            var deferred = $q.defer();

            $http.get("/api/assignment/user/" + userId + "/form")
                .success(function(response) {
                    deferred.resolve(response);
                });

            return deferred.promise();
		}

		function deleteFormById(formId) {
            var deferred = $q.defer();

            $http.delete("/api/assignment/form/" + formId)
                .success(function(response) {
                    deferred.resolve(response);
                });

            return deferred.promise();
		}

		function updateFormById(formId, newForm) {
            var deferred = $q.defer();

            $http.put("/api/assignment/form/" + formId, newForm)
                .success(function(response) {
                    deferred.resolve(response);
                });

            return deferred.promise();
		}
	}
})();