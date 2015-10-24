"use strict";
(function() {
	angular
		.module('FormBuilderApp')
		.contoller('HeaderController', HeaderController);

	function HeaderController($scope, $location) {
		$scope.$location = $location;
	}
})();