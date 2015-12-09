"use strict";
(function() {
    angular
        .module("safeHouseApp")
        .controller("homeController", homeController);

    function homeController($scope, $rootScope, docService) {
        docService
            .findRandomDoc()
            .then(function(doc) {
                $scope.randDoc = doc;
            });
        $scope.hasDoc = function() {
            return $scope.randDoc;
        }
    }
})();
