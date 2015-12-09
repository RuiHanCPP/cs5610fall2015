"use strict";
(function() {
    angular
        .module("safeHouseApp")
        .controller("newDocController", newDocController);

    function newDocController($scope, $rootScope, $location, docService, tagService) {

        init();

        function init() {
            if ($rootScope.user == undefined) {
                $location.path("/home");
            }

            $scope.doc = {
                title: "",
                snapShot: "",
                content: "",
                comments: [],
                userId: $rootScope.user._id,
                tags: []
            };

            $scope.selection = {
                ids: {}
            };
            $scope.newTag = {
                tagName: ""
            };
            tagService
                .findAllTags()
                .then(function(response) {
                    $scope.tags = response;
                    for (var i in $scope.tags) {
                        $scope.selection.ids[$scope.tags[i]._id] = false;
                    }
                });
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
                    docService
                        .createDoc($scope.doc)
                        .then(function(respond) {
                            $location.path("/doc/detail/" + respond._id);
                        });
                }
            }

        };
    }
})();