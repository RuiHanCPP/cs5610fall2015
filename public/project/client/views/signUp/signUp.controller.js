"use strict";
(function() {
    angular
        .module("safeHouseApp")
        .controller("signUpController", signUpController);

    function signUpController($scope, $rootScope, $location, userService) {

        init();

        $scope.passwordMatch = function() {
            return $scope.passwordA == $scope.passwordB;
        };

        $scope.signUp = function() {
            if (inputValidate()) {
                console.log('here');
                var user = {
                    username: $scope.username,
                    password: $scope.passwordA,
                    email: $scope.email.text,
                    isAdmin: false,
                    nickName: $scope.nickname
                };
                // This will return a list of all users.
                userService.createUser(user).then(createUser);
            }
        };

        function createUser(respondUser) {
            // look for the current user $scope.username
            var user = null;
            userService
                .findUserByCredential($scope.username, $scope.passwordA)
                .then(function(response) {
                    user = response;
                    $rootScope.user = user;
                    $location.path("/home");
                });
        }

        function init() {
            if ($rootScope.user !== undefined) {
                $location.path("/home");
            } else {
                $scope.username = "";
                $scope.passwordA = "";
                $scope.passwordB = "";
                $scope.email = {
                    type: ""
                };
                $scope.nickname = "";
                $scope.validUsername = true;
                $scope.validEmail = true;
            }
        }
        function inputValidate() {
            if ($scope.passwordA == $scope.passwordB && $scope.nickname != "" && $scope.myForm.emailInput.$valid) {
                userService
                    .findUserByUsername($scope.username)
                    .then(function(response) {
                        if (response == null) {
                            $scope.validUsername = true;
                            userService.findUserByEmail($scope.email.text)
                                .then(function(response) {
                                    $scope.validEmail = response == null;
                                });
                        } else {
                            $scope.validUsername = false;
                            return false;
                        }
                    });
                return $scope.validEmail && $scope.validUsername;
            } else {
                return false;
            }
        }
    }
})();
