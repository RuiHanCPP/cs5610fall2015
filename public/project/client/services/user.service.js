"use strict";
(function() {
    angular
        .module('safeHouseApp')
        .factory('userService', userService);

    function userService($http, $q) {
        var userService = {
            createUser: createUser,
            findUserById: findUserById,
            findAllUsers: findAllUsers,
            findUserByCredential: findUserByCredential,
            findUserByUsername: findUserByUsername,
            findUserByEmail: findUserByEmail,
            updateUser: updateUser,
            deleteNewCommentById: deleteNewCommentById,
            addNewCommentById: addNewCommentById
    };

        return userService;

        function addNewCommentById(docId, userId) {
            var deferred = $q.defer();
            $http.post("/api/project/user/" + docId + "/" + userId)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function deleteNewCommentById(docId, userId) {
            var deferred = $q.defer();
            $http.delete("/api/project/user/" + docId + "/" + userId)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findAllUsers(user) {
            var deferred = $q.defer();
            $http.get("/api/project/user")
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findUserById(uid) {
            var deferred = $q.defer();
            $http.get("/api/project/user/" + uid)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findUserByCredential(username, password) {
            var deferred = $q.defer();
            $http.get("/api/project/user?username=" + username + "&password=" + password)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findUserByUsername(username) {
            var deferred = $q.defer();
            $http.get("/api/project/user?username=" + username)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findUserByEmail(email) {
            var deferred = $q.defer();
            $http.get("/api/project/user?email=" + email)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function updateUser(user, id, adminId) {
            var deferred = $q.defer();
            $http.put("/api/project/user/" + id + "/" + adminId, user)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function createUser(user) {
            var deferred = $q.defer();
            $http.post("/api/project/user", user)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }
    }
})();
