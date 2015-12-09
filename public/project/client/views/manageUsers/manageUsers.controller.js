"use strict";
(function() {
    angular
        .module("safeHouseApp")
        .controller("manageUsersController", manageUsersController);

    function manageUsersController($scope, $location, $rootScope, userService) {

        init();

        function init() {

            if ($rootScope.user && $rootScope.user.isAdmin) {
                $scope.user = $rootScope.user;
            } else {
                $location.path("/home");
            }
            getUsers();
        }

        $scope.toAdmin = function(index) {
            $scope.users[index].isAdmin = true;
            userService
                .updateUser($scope.users[index], $scope.users[index]._id, $scope.user._id)
                .then(function(user) {
                    $scope.user[index] = user;
                    console.log(user);
                });
        };

        $scope.toNormalUser = function(index) {
            $scope.users[index].isAdmin = false;
            userService
                .updateUser($scope.users[index], $scope.users[index]._id, $scope.user._id)
                .then(function(user) {
                    $scope.user[index] = user;
                });
        };

        function getUsers() {
            userService
                .findAllUsers()
                .then(function(users) {
                    $scope.users = users;
                    for (var i in $scope.users) {
                        if ($scope.users[i]._id == $scope.user._id) {
                            $scope.users.splice(i, 1);
                        }
                    }
                });
        }
    }
})();