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
				UserService.createUser(user, createUser);
			}
		}

		function createUser(user) {
			console.log(user);
			$rootScope.user = user;
			$location.path("/profile");
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