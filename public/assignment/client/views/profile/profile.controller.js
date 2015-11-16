"use strict";
(function() {
	angular
		.module("FormBuilderApp")
		.controller("ProfileController", ProfileController);

	function ProfileController($scope, $rootScope, $location, UserService) {
		
		init();

		$scope.update = function() {
			var user = {
					username: $scope.username,
					password: $scope.password,
					email: $scope.email,
					firstName: $scope.firstname,
					lastName: $scope.lastname
			};
			// the response is all users
			UserService
				.updateUser($rootScope.user.id, user)
				.then(updateUser);
		}

		function updateUser(users) {
			UserService
				.findUserByUsernameAndPassword($scope.username, $scope.password)
				.then(function(response) {
					$rootScope.user = response;
					console.log("after update: ");
					console.log("first : " + $rootScope.user.firstName);
					console.log("last : " + $rootScope.user.lastName);
					getUserFromRoot();
					alert("Profile update complete!");
				});
		}

		function getUserFromRoot() {
			$scope.username = $rootScope.user.username;
			$scope.password = $rootScope.user.password;
			$scope.email = $rootScope.user.email;
			$scope.firstname = $rootScope.user.firstName;
			$scope.lastname = $rootScope.user.lastName;
		}
		
		function init() {
			if ($rootScope.user === undefined) {
				$location.path("/home");
			} else {
				getUserFromRoot();
			}
		}
	}
})();