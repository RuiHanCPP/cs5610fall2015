"use strict";
(function() {
    angular
        .module("safeHouseApp")
        .controller("docEditController", docEditController);

    function docEditController($scope, $routeParams, $rootScope, $location, docService, tagService) {

        init();

        function init() {
            if (!$rootScope.user) {
                $location.path("/home");
            }
            docService
                .findDocById($routeParams.id)
                .then(function(doc) {
                    if (doc == null) {
                        $location.path("/home");
                    }
                    $scope.doc = doc;
                    console.log($scope.doc);
                    tagService
                        .findAllTags()
                        .then(function(response) {
                            $scope.tags = response;
                            for (var i in $scope.tags) {
                                $scope.selection.ids[$scope.tags[i]._id] = false;
                            }
                            for (var i in $scope.doc.tags) {
                                $scope.selection.ids[$scope.doc.tags[i]] = true;
                            }
                        });
                });

            $scope.selection = {
                ids: {}
            };
            $scope.newTag = {
                tagName: ""
            };
        }

        $scope.createTag = function() {
            tagService
                .createTag($scope.newTag)
                .then(function(respond) {
                    $scope.tags.push(respond);
                    $scope.newTag.tagName = "";
                });
        };

        $scope.cancel = function() {
            $location.path("/home");
        };

        $scope.confirm = function() {
            if ($scope.doc.title == "") {
                $scope.errorMessage = "A title is needed";
            } else if ($scope.doc.snapShot == "") {
                $scope.errorMessage = "A clear snapShot is needed";
            } else if ($scope.doc.content == "") {
                $scope.errorMessage = "To be a document, it at least has to have some content";
            } else {
                for (var id in $scope.selection.ids) {
                    if ($scope.selection.ids[id]) {
                        $scope.doc.tags.push(id);
                    }
                }
                if ($scope.doc.tags.length < 1) {
                    $scope.errorMessage = "You need to select at least one tag";
                } else {
                    console.log($scope.doc);
                    docService
                        .updateDoc($scope.doc._id, $scope.doc)
                        .then(function(respond) {
                            $location.path("/doc/detail/" + respond._id);
                        });
                }
            }
        };
    }
})();