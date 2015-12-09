"use strict";
(function() {
    angular
        .module("safeHouseApp")
        .controller("docByTagsController", docByTagsController);

    function docByTagsController($scope, $rootScope, tagService, docService, userService) {

        init();

        function init() {

            if ($rootScope.user) {
                $scope.user = $rootScope.user;
                $scope.hasUser = true;
                $scope.ownDoc = {
                    value: false
                };
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
                    getDocs(tags);
                });
        }

        $scope.search = function() {
            var tagIds = [];
            for (var id in $scope.selection.ids) {
                if ($scope.selection.ids[id]) {
                    tagIds.push(id);
                }
            }
            getDocs(tagIds);
        };

        function getDocs(tagIds) {
            $scope.docList = [];
            docService
                .findDocByTagIds(tagIds)
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