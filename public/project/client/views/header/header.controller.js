"use strict";
(function() {
    angular
        .module("safeHouseApp")
        .controller("headerController", headerController);

    function headerController($scope, $rootScope) {
        if ($rootScope.user) {
            $scope.user = $rootScope.user;
            if (!$scope.user.newComments) {
                $scope.user.newComments = [];
            }
        }
        $scope.hasUser = function() {
            return $rootScope.user !== undefined;
        };
        $scope.logout = function() {
            delete $rootScope.user;
        }
    }
})();
