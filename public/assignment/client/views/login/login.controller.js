"use strict";
(function() {
	angular
		.module("FormBuilderApp")
		.controller("LoginController", LoginController);

	function LoginController($scope, $rootScope, $location, UserService) {

		init();

		$scope.login = function() {
			UserService.findUserByUsernameAndPassword($scope.username, $scope.password).then(userGetter);
		};

		function userGetter(res) {
			console.log(res);
			if (res != null) {
				$rootScope.user = res;
				$location.path("/profile");
			} else {
				alert("Invalid username/password");
			}
		}
		function init() {
			if ($rootScope.user !== undefined) {
				$location.path("/home");
			}
		}
	}

})();