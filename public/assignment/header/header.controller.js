"use strict";
(function() {
	angular
		.module("FormBuilderApp")
		.controller("HeaderController", HeaderController);

	function HeaderController($scope, $rootScope, $location) {
		$scope.$location = $location;
		$scope.hasUser = $rootScope.user !== undefined;
		$scope.isActive = function(path) {
			return $location.url().indexOf('register') != -1;
		}
		$scope.logout = function() {
			delete $rootScope.user;
			console.log($rootScope.user);
		}
	}
})();