"use strict";
(function() {
	angular
		.module("FormBuilderApp")
		.config(Configure);

	function Configure($routeProvider) {
		$routeProvider
			.when("/", {
				templateUrl: "views/home/home.view.html"
			})
			.when("/home", {
                redirectTo: "/"
			})
			.when("/login", {
				templateUrl: "views/login/login.view.html",
				controller: "LoginController"
			})
			.when("/register", {
				templateUrl: "views/register/register.view.html",
				controller: "RegisterController"
			})
			.when("/profile", {
				templateUrl: "views/profile/profile.view.html",
				controller: "ProfileController"
			})
			.when("/form", {
				templateUrl: "views/form/form.view.html",
				controller: "FormController"
			})
            .when("/user/:userId/form/:formId/fields", {
                templateUrl: "views/fields/fields.view.html",
                controller: "FieldController"
            })
			.otherwise({
				redirectTo: "/"
			});
	}
})();