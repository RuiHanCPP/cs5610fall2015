"use strict";
(function() {
    angular
        .module("safeHouseApp")
        .controller("docDetailController", docDetailController);

    function docDetailController($scope, $location, $routeParams, $rootScope, docService, tagService, commentService, userService) {

        var replyHeader;
        var replyCommentId;
        init();

        $scope.reply = function(index) {
            replyHeader =  "Reply to " + $scope.comments[index].nickName + ": ";
            $scope.replyMessage = replyHeader;
            replyCommentId = $scope.comments[index]._id;
            console.log($scope.doc.content);
        };

        $scope.cancelReply = function() {
            $scope.replyMessage = "";
            replyCommentId = "";
            replyHeader = "";
        };

        $scope.sendReply = function() {
            if (replyHeader != "") {
                console.log(replyHeader);
                $scope.replyMessage = $scope.replyMessage.replace(replyHeader, "");
            }
            console.log($scope.replyMessage);
            commentService
                .createComment({
                    content: $scope.replyMessage,
                    userId: $rootScope.user._id,
                    replyTo: replyCommentId,
                    docId: $scope.doc._id
                }).then(function(response) {
                    if (replyCommentId != "") {
                        userService
                            .addNewCommentById($scope.doc._id, $scope.comment[replyCommentId].userId)
                            .then(function(response) {
                                $location.path("/home");
                            });
                    } else {
                        userService
                            .addNewCommentById($scope.doc._id, $scope.author._id)
                            .then(function(response) {
                                $location.path("/home");
                            });
                    }
                });
        };

        function init() {
            var docId = $routeParams.id;
            $scope.replyMessage = "";
            replyHeader = "";
            replyCommentId = "";
            $scope.comment = {};
            if ($rootScope.user) {
                $scope.canComment = true;
            } else {
                $scope.canComment = false;
            }
            docService
                .findDocById(docId)
                .then(function(response) {
                    if (response == null) {
                        console.log("doc doesn't exist??");
                    }
                    $scope.doc = response;
                    $scope.doc.content = $scope.doc.content.replace(/(?:\r\n|\r|\n)/g, "<br>");
                    $scope.doc.snapShot = $scope.doc.snapShot.replace(/(?:\r\n|\r|\n)/g, "<br>");
                    $scope.canEdit = ($rootScope.user && $rootScope.user._id == $scope.doc.userId);
                    $scope.tags = [];
                    for (var i in $scope.doc.tags) {
                        tagService
                            .findTagById($scope.doc.tags[i])
                            .then(function(respond) {
                                $scope.tags.push(respond);
                            });
                    }
                    userService
                        .findUserById($scope.doc.userId)
                        .then(function(user) {
                            $scope.author = user;
                        });commentService
                            .findAllCommentsByDocId($scope.doc._id)
                            .then(function(comments) {
                                $scope.comments = comments;
                                $scope.comments.forEach(function(comment, index, comments) {
                                    userService
                                        .findUserById(comment.userId)
                                        .then(function(user) {
                                            comments[index].nickName = user.nickName;
                                            $scope.comment[comment._id] = comment;
                                            if (index + 1 == $scope.comments.length) {
                                                $scope.comments.forEach(function(comment, index, comments) {
                                                    if (comment.replyTo && comment.replyTo != "") {
                                                        comments[index].content = "Reply to " + $scope.comment[comments[index].replyTo].nickName + ": " + comments[index].content;
                                                    }
                                                    comments[index].content = comments[index].content.replace(/(?:\r\n|\r|\n)/g, '<br />');
                                                });
                                            }
                                        });
                                });

                            });
                });
        }
    }
})();