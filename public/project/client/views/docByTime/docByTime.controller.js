"use strict";
(function() {
    angular
        .module("safeHouseApp")
        .controller("docByTimeController", docByTimeController);

    function docByTimeController($scope, $rootScope, docService, userService) {

        init();

        $scope.hasDoc = function() {
            return $scope.docList.length > 0;
        };
        $scope.search = function() {
            getDocs($scope.startDate, $scope.endDate);
        };

        function init() {
            if ($rootScope.user) {
                $scope.user = $rootScope.user;
                $scope.hasUser = true;
                $scope.ownDoc = {
                    value: false
                };
            }
            getDocs(null, new Date());
        }

        function getDocs(startDate, endDate) {
            $scope.docList = [];
            docService
                .findDocByTime(startDate, endDate)
                .then(function(docs) {
                    docs.forEach(function(doc, index, docList) {
                        if (!$rootScope.user || !$scope.ownDoc.value || docList[index].userId == $rootScope.user._id) {
                            userService
                                .findUserById(doc.userId)
                                .then(function(user) {
                                    doc.username = user.nickName;
                                    $scope.docList.push(doc);
                                });
                        }
                    });
                });
        }
    }
})();