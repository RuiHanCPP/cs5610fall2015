(function()) {
	angular
		.module("FormBuilderApp")
		.controller("LoginController", LoginController);

	function LoginController($rootScope, $scope, $location, UserService) {

		$scope.login = function() {
			var res = UserService.findUserByUsernameAndPassword($scope.username, $scope.password, userGetter);
			if (res != null) {
				$rootScope.user = res;
				$location.path("/profile");
			}
		}

		function userGetter(res) {
			console.log(res);
			return res;
		}
	}

}();