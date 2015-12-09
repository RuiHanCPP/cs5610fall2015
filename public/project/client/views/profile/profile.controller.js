"use strict";
(function() {
    angular
        .module("safeHouseApp")
        .controller("profileController", profileController);

    function profileController($scope, $rootScope, $location, $routeParams, userService, docService) {
        init();

        $scope.readComment = function(index) {
            userService
                .deleteNewCommentById($scope.docs[index]._id, $scope.user._id)
                .then(function(respond) {
                    $scope.user = respond;
                    $location.path("/docDetail/" + $scope.docs[index]._id);
                });
        };

        function init() {
            var uId = $routeParams.uId;
            $scope.docs = [];
            $scope.adminView = $rootScope.user && $rootScope.user.isAdmin;
            userService
                .findUserById(uId)
                .then(function(respond) {
                    if (respond == null) {
                        $location.path("/home");
                    }
                    $scope.user = respond;

                    if (!$scope.user.newComments) {
                        $scope.user.newComments = [];
                    }

                    if ($scope.user.isAdmin) {
                        $scope.isAdmin = {
                            message: $scope.user.nickName + "is an admin"
                        }
                    } else {
                        $scope.isAdmin = {
                            message: $scope.user.nickName + " is a normal user"
                        }
                    }

                    $scope.sameUser = $scope.user._id == $rootScope.user._id;

                    for (var i in $scope.user.newComments) {
                        docService
                            .findDocById($scope.user.newComments[i])
                            .then(function(doc) {
                                $scope.docs.push(doc);
                            });
                    }
                });
        }
    }
})();
