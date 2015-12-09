"use strict";
(function() {
    angular
        .module("safeHouseApp")
        .controller("loginController", loginController);

    function loginController($scope, $rootScope, $location, userService) {
        init();

        $scope.login = function() {
            userService.findUserByCredential($scope.username, $scope.password)
                .then(userGetter);
        };

        function userGetter(res) {
            if (res != undefined) {
                $rootScope.user = res;
                $location.path("/home");
            } else {
                if (!$scope.username) {
                    $scope.errorMessage = "Please enter the username";
                } else if (!$scope.password) {
                    $scope.errorMessage = "Please enter the password";
                } else {
                    $scope.errorMessage = "Invalid username/password";
                }
            }
        }
        function init() {
            if ($rootScope.user !== undefined) {
                $location.path("/home");
            }
        }
    }
})();
