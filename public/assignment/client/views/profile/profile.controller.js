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
					firstname: $scope.firstname,
					lastname: $scope.lastname
			};
			UserService.updateUser($rootScope.user.id, user).then(updateUser);
		}

		function updateUser(user) {
			console.log(user);
			$rootScope.user.username = user.username;
			$rootScope.user.password = user.password;
			$rootScope.user.email = user.email;
			$rootScope.user.firstname = user.firstname;
			$rootScope.user.lastname = user.lastname;
			getUserFromRoot();
			alert("Profile update complete!");
		}

		function getUserFromRoot() {
			$scope.username = $rootScope.user.username;
			$scope.password = $rootScope.user.password;
			$scope.email = $rootScope.user.email;
			$scope.firstname = $rootScope.user.firstname;
			$scope.lastname = $rootScope.user.lastname;
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