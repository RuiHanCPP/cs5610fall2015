"use strict";
(function() {
	angular
		.module("FormBuilderApp")
		.controller("LoginController", LoginController);

	function LoginController($rootScope, $scope, $location, UserService) {

		$scope.login = function() {
			UserService.findUserByUsernameAndPassword($scope.username, $scope.password, userGetter);
		}

		function userGetter(res) {
			console.log(res);
			if (res != null) {
				$rootScope.user = res;
				$location.path("/profile");
			}
		}
	}

})();