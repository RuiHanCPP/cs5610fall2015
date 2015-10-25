"use strict";
(function() {
	angular
		.module("FormBuilderApp")
		.config(Configure);

	function Configure($routeProvider) {
		$routeProvider
			.when("/", {
				templateUrl: "home/home.view.html",
			})
			.when("/home", {
				templateUrl: "home/home.view.html",
			})
			.when("/login", {
				templateUrl: "login/login.view.html",
				controller: "LoginController",
			})
			.when("/register", {
				templateUrl: "register/register.view.html",
				controller: "RegisterController",
			})
			.when("/profile", {
				templateUrl: "profile/profile.view.html",
				controller: "ProfileController",
			})
			.otherwise({
				redirectTo: "/"
			});
	}
})();