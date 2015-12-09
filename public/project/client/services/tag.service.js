"use strict";
(function() {
    angular
        .module('safeHouseApp')
        .factory('tagService', tagService);

    function tagService($http, $q) {
        var tagService = {
            createTag: createTag,
            findTagById: findTagById,
            findAllTags: findAllTags,
            updateTagName: updateTagName,
            deleteTag: deleteTag,
            mergeTag: mergeTag
        };

        return tagService;

        function mergeTag(idA, idB, tagName) {
            var deferred = $q.defer();
            $http.put("/api/project/tag/" + idA + "/" + idB, {tagName: tagName})
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findAllTags() {
            var deferred = $q.defer();
            $http.get("/api/project/tag")
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findTagById(tagId) {
            var deferred = $q.defer();
            $http.get("/api/project/tag/" + tagId)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function updateTagName(id, name) {
            var deferred = $q.defer();
            $http.put("/api/project/document/" + id, {name: name})
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function createTag(tag) {
            var deferred = $q.defer();
            $http.post("/api/project/tag", tag)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function deleteTag(id) {
            var deferred = $q.defer();
            $http.delete("/api/project/tag/" + id)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }
    }
})();
