"use strict";
(function() {
    angular
        .module("safeHouseApp")
        .controller("profileEditController", profileEditController);

    function profileEditController($scope, $rootScope, $location, userService) {
        var user = null;
        init();

        function init() {
            if ($rootScope.user == undefined) {
                $location.path("/home");
            } else {
                user = $rootScope.user;
                $scope.selfDesc = user.selfDesc;
                $scope.passwordA = "";
                $scope.passwordB = "";
                $scope.imageUrl = user.avatar;
                $scope.email = {
                    type: ""
                };
                $scope.nickName = user.nickName;
                $scope.validEmail = true;
                $scope.updated = false;
            }
        }

        $scope.cancel = function() {
            $location.path("/home");
        };

        $scope.passwordMatch = function() {
            return $scope.passwordA == $scope.passwordB;
        };
        
        $scope.confirm = function() {
            $scope.updated = false;
            if (inputValidate()) {
                console.log(user);
                var isSame = true;
                if ($scope.passwordA != "") {
                    user.password = $scope.passwordA;
                    isSame = false;
                }
                if (user.selfDesc != $scope.selfDesc) {
                    user.selfDesc = $scope.selfDesc;
                    isSame = false;
                }
                if ($scope.email.text != "") {
                    user.email = $scope.email.text;
                    isSame = false;
                }
                if ($scope.imageUrl != "") {
                    user.avatar = $scope.imageUrl;
                    isSame = false;
                }
                if ($scope.nickname != "") {
                    user.nickName = $scope.nickName;
                    isSame = false;
                }
                if (!isSame) {
                    userService
                        .updateUser(user, user._id, user._id)
                        .then(function(response) {
                            user = response;
                            $rootScope.user = user;
                            $scope.passwordA = "";
                            $scope.passwordB = "";
                            $scope.updated = true;
                            $rootScope.user = user;
                        });
                }
            }
        };

        function inputValidate() {
            if ($scope.passwordA == $scope.passwordB) {
                console.log($scope.email);
                if (!$scope.email.text) {
                    return true;
                } else if ($scope.myForm.emailInput.$valid) {
                    userService
                        .findUserByEmail($scope.email.text)
                        .then(function (response) {
                            $scope.validEmail = (response == null);
                            return $scope.validEmail;
                        });
                }
            }
            return false;
        }
    }
})();