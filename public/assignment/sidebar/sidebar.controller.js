"use strict";
(function() {
	angular
		.module("FormBuilderApp")
		.controller("SidebarController", SidebarController);

	function SidebarController($scope, $rootScope, $location) {
		$scope.$location = $location;
		$scope.hasUser = $rootScope.user !== undefined;
		$scope.isActive = function(path) {
			return $location.url().indexOf(path) != -1;
		}
	}
})();