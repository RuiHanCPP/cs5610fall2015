"use strict";
(function() {
    angular
        .module("safeHouseApp")
        .config(configure);

    function configure($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html",
                controller: "homeController"
            })
            .when("/login", {
                templateUrl: "views/login/login.view.html",
                controller: "loginController"
            })
            .when('/doc/byTags', {
                templateUrl: "views/docByTags/docByTags.view.html",
                controller: "docByTagsController"
            })
            .when('/doc/byTime', {
                templateUrl: "views/docByTime/docByTime.view.html",
                controller: "docByTimeController"
            })
            .when('/doc/', {
                templateUrl: "views/docByTime/docByTime.view.html",
                controller: "docByTimeController"
            })
            .when('/doc/detail/:id', {
                templateUrl: "views/docDetail/docDetail.view.html",
                controller: "docDetailController"
            })
            .when('/doc/detail/:id/edit', {
                templateUrl: "views/docEdit/docEdit.view.html",
                controller: "docEditController"
            })
            .when('/manageUsers', {
                templateUrl: "views/manageUsers/manageUsers.view.html",
                controller: "manageUsersController"
            })
            .when('/newDoc', {
                templateUrl: "views/newDoc/newDoc.view.html",
                controller: "newDocController"
            })
            .when('/editProfile', {
                templateUrl: "views/profileEdit/profileEdit.view.html",
                controller: "profileEditController"
            })
            .when('/mergeTags', {
                templateUrl: "views/mergeTags/mergeTags.view.html",
                controller: "mergeTagsController"
            })
            .when('/signUp', {
                templateUrl: "views/signUp/signUp.view.html",
                controller: "signUpController"
            })
            .when('/profile/:uId', {
                templateUrl: "views/profile/profile.view.html",
                controller: "profileController"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();

