"use strict";
(function() {
    angular
        .module("safeHouseApp")
        .config(configure);

    function configure($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "home/home.view.html"
            })
            .when("/login", {
                templateUrl: "login/login.view.html",
                controller: "loginController"
            })
            .when('/doc/byTags', {
                templateUrl: "docByTags/docByTags.view.html",
                controller: "docByTagsController"
            })
            .when('/doc/byTime', {
                templateUrl: "docByTime/docByTime.view.html",
                controller: "docByTimeController"
            })
            .when('/doc/', {
                templateUrl: "docByTime/docByTime.view.html",
                controller: "docByTimeController"
            })
            .when('/doc/detail', {
                templateUrl: "docDetail/docDetail.view.html",
                controller: "docDetailController"
            })
            .when('/doc/detail/edit', {
                templateUrl: "docEdit/docEdit.view.html",
                controller: "docEditController"
            })
            .when('/newDoc', {
                templateUrl: "newDoc/newDoc.view.html",
                controller: "newDocController"
            })
            .when('/editProfile', {
                templateUrl: "profileEdit/profileEdit.view.html",
                controller: "profileEditController"
            })
            .when('/mergeTags', {
                templateUrl: "mergeTags/mergeTags.view.html",
                controller: "mergeTagsController"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();

