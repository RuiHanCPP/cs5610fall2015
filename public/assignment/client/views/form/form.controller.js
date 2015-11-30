"use strict";
(function() {
	angular
		.module("FormBuilderApp")
		.controller("FormController", FormController);
		
	function FormController($scope, $rootScope, $location, FormService) {
        $scope.forms = null;
        $scope.userId = $rootScope.user.id;
        init();
		var curForm = undefined;
		
		$scope.addForm = function() {
			FormService.createFormForUser($rootScope.user.id, {title: $scope.formName}).then(logUpdate);
			FormService.findAllFormForUser($rootScope.user.id).then(updateForms);
			console.log($scope.forms);
		};
		
		$scope.updateForm = function() {
			if (curForm !== undefined) {
				curForm.title = $scope.formName;
				console.log(curForm);
				FormService.updateFormById(curForm.id, curForm).then(logUpdate);
				FormService.findAllFormForUser($rootScope.user.id).then(updateForms);
			}
		};
		
		$scope.deleteForm = function($index) {
			if (curForm !== undefined && $scope.forms[$index].id === curForm.id) {
				curForm = undefined;
				$scope.formName = "";
			}
			FormService.deleteFormById($scope.forms[$index].id).then(logUpdate);
			FormService.findAllFormForUser($rootScope.user.id).then(updateForms);
		};
		
		$scope.selectForm = function($index) {
			curForm = $scope.forms[$index];
			$scope.formName = curForm.title;
		};
		
		$scope.disableUpdate = function() {
			return curForm === undefined || $scope.formName === "";
		};
		
		$scope.disableAdd = function() {
			return $scope.formName === "";
		};
		
		function updateForms(forms) {
			$scope.forms = forms;
			$scope.formName = "";
			curForm = undefined;
            console.log("forms now: " + $scope.forms);
		}
		function logUpdate(form) {
			console.log(form);
		}
		
		function init() {
			if ($rootScope.user === undefined) {
				$location.path("/home");
			} else {
				FormService.findAllFormForUser($rootScope.user.id).then(updateForms);

			}
		}
	}
})();