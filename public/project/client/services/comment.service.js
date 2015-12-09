"use strict";
(function() {
    angular
        .module('safeHouseApp')
        .factory('commentService', commentService);

    function commentService($http, $q) {
        var commentService = {
            createComment: createComment,
            findCommentById: findCommentById,
            findAllComments: findAllComments,
            findAllCommentsByDocId: findAllCommentsByDocId
        };

        return commentService;

        function findCommentById(commentId) {
            var deferred = $q.defer();
            $http.get("/api/project/comment/" + commentId)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findAllComments() {
            var deferred = $q.defer();
            $http.get("/api/project/comment")
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findAllCommentsByDocId(dId) {
            var deferred = $q.defer();
            $http.get("/api/project/comment?docId=" + dId)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function createComment(comment) {
            var deferred = $q.defer();
            $http.post("/api/project/comment", comment)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }
    }
})();
