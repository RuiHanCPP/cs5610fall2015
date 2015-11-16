"use strict";
(function() {
	angular
		.module("FormBuilderApp")
		.controller("RegisterController", RegisterController);

	function RegisterController($scope, $rootScope, $location, UserService) {
		
		init();
		
		$scope.register = function() {
			if (inputValidate()) {
				var user = {
					username: $scope.username,
					password: $scope.password,
					email: $scope.email.text,
				};
				// This will return a list of all users.
				UserService.createUser(user).then(createUser);
			}
			else {
				window.alert("Please enter valid information");
			}
		}

		function createUser(users) {
			// look for the current user $scope.username
			var user = null;
			UserService
				.findUserByUsernameAndPassword($scope.username, $scope.password)
				.then(function(response) {
					user = response;
					$rootScope.user = user;
					$location.path("/profile");
				});

		}
		function init() {
			if ($rootScope.user !== undefined) {
				$location.path("/home");
			} else {
				$scope.username = "username";
				$scope.email = {
					text: 'me@example.com'
				};
			}
		}
		function inputValidate() {
			return $scope.password == $scope.passwordRe && $scope.myForm.emailInput.$valid;
		}
	}
})();