(function() {
	angular
		.module("FormBuilderApp")
		.controller("FormController", FormController);
		
	function FormController($scope, $rootScope, FormService) {
		
		$scope.forms = [];
		
		$scope.addForm = function () {
			FormService.createFormForUser()
		}
	}
})();