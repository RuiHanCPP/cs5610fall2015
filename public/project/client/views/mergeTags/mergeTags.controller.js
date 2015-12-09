"use strict";
(function() {
    angular
        .module("safeHouseApp")
        .controller("mergeTagsController", mergeTagsController);

    function mergeTagsController($scope, $location, $rootScope, tagService) {

        init();

        function init() {
            if ($rootScope.user && $rootScope.user.isAdmin) {
                $scope.user = $rootScope.user;
                $scope.hasUser = true;
                $scope.ownDoc = false;
            } else {
                $location.path("/home");
            }

            $scope.selection = {
                ids: {}
            };
            tagService
                .findAllTags()
                .then(function(tags) {
                    $scope.tags = tags;
                    for (var i in $scope.tags) {
                        $scope.selection.ids[$scope.tags[i]._id] = false;
                    }
                });

            if ($scope.tags == []) {
                $location.path("/home");
            }
            $scope.newName = "";

            $scope.selectedTagIds = [];
        }

        $scope.error = function() {
            return $scope.errorMessage;
        };
        $scope.success = function() {
            return $scope.successMessage;
        };

        $scope.merge = function() {
            if (mergeValidate()) {
                tagService
                    .mergeTag($scope.selectedTagIds[0], $scope.selectedTagIds[1], $scope.newName)
                    .then(function(res) {
                        tagService
                            .findAllTags()
                            .then(function(tags) {
                                $scope.selection = {
                                    ids: {}
                                };
                                $scope.tags = tags;
                                for (var i in $scope.tags) {
                                    $scope.selection.ids[$scope.tags[i]._id] = false;
                                }
                                $scope.successMessage = "Merge success!";
                                delete $scope.errorMessage;
                            });
                    });
            } else {
                if ($scope.newName == "") {
                    $scope.errorMessage = "Please provide a name for the new merged tag";
                }
                $scope.errorMessage = "Please choose two tags at a time";
            }
        };

        function mergeValidate() {
            for (var id in $scope.selection.ids) {
                if ($scope.selection.ids[id]) {
                    console.log(id);
                    if ($scope.selectedTagIds.length >= 2) {
                        return false;
                    }
                    $scope.selectedTagIds.push(id);
                }
            }
            return $scope.selectedTagIds.length == 2 && $scope.newName != "";
        }
    }
})();