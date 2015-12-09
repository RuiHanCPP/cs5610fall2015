"use strict";
(function() {
    angular
        .module('safeHouseApp')
        .factory('docService', docService);

    function docService($http, $q) {
        var docService = {
            createDoc: createDoc,
            findDocById: findDocById,
            findDocByTitle: findDocByTitle,
            findAllDocs: findAllDocs,
            findAllDocsByUserId: findAllDocsByUserId,
            findRandomDoc: findRandomDoc,
            findDocByTime: findDocByTime,
            findDocByTagIds: findDocByTagIds,
            updateDoc: updateDoc,
            deleteDoc: deleteDoc
        };

        return docService;

        function findDocByTagIds(tagIds) {
            var deferred = $q.defer();
            $http.put("/api/project/document/tags", {tagIds: tagIds})
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findAllDocs() {
            var deferred = $q.defer();
            $http.get("/api/project/document")
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findDocById(dId) {
            var deferred = $q.defer();
            $http.get("/api/project/document/" + dId)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findAllDocsByUserId(uId) {
            var deferred = $q.defer();
            $http.get("/api/project/document/user/" + uId)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findDocByTitle(title) {
            var deferred = $q.defer();
            $http.get("/api/project/document?title=" + title)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findRandomDoc() {
            var deferred = $q.defer();
            $http.get("/api/project/document/random")
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findDocByTime(startDate, endDate) {
            var deferred = $q.defer();
            if (startDate && endDate) {
                $http.get("/api/project/document?startDate=" + startDate + "&endDate=" + endDate)
                    .success(function(response) {
                        deferred.resolve(response);
                    });
            } else if (endDate) {
                $http.get("/api/project/document?endDate=" + endDate)
                    .success(function(response) {
                        deferred.resolve(response);
                    });
            } else {
                $http.get("/api/project/document?startDate=" + startDate)
                    .success(function(response) {
                        deferred.resolve(response);
                    });
            }
            return deferred.promise;
        }

        function updateDoc(id, document) {
            var deferred = $q.defer();
            $http.put("/api/project/document/" + id, user)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function createDoc(document) {
            var deferred = $q.defer();
            $http.post("/api/project/document", document)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function deleteDoc(id) {
            var deferred = $q.defer();
            $http.delete("/api/project/document/" + id)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }
    }
})();
