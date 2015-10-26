"use strict";
(function() {
	angular
		.module("FormBuilderApp")
		.controller("FormController", FormController);
		
	function FormController($scope, $rootScope, $location, FormService) {
		
		init();
		var curForm = undefined;
		
		$scope.addForm = function() {
			FormService.createFormForUser($rootScope.user.id, {formName: $scope.formName}, logUpdate);
			FormService.findAllFormForUser($rootScope.user.id, updateForms);
			console.log($scope.forms);
		}
		
		$scope.updateForm = function() {
			if (curForm !== undefined) {
				curForm.formName = $scope.formName;
				console.log(curForm);
				FormService.updateFormById(curForm.id, curForm, logUpdate);
				FormService.findAllFormForUser($rootScope.user.id, updateForms);
			}
		}
		
		$scope.deleteForm = function($index) {
			if (curForm !== undefined && $scope.forms[$index].id === curForm.id) {
				curForm = undefined;
				$scope.formName = "";
			}
			FormService.deleteFormById($scope.forms[$index].id, logUpdate);
			FormService.findAllFormForUser($rootScope.user.id, updateForms);
		}
		
		$scope.selectForm = function($index) {
			curForm = $scope.forms[$index];
			$scope.formName = curForm.formName;
		}
		
		$scope.disableUpdate = function() {
			return curForm === undefined || $scope.formName === "";
		}
		
		$scope.disableAdd = function() {
			return $scope.formName === "";
		}
		
		function updateForms(forms) {
			$scope.forms = forms;
			$scope.formName = "";
			curForm = undefined;
			console.log($scope.forms);
		}
		function logUpdate(form) {
			console.log(form);
		}
		
		function init() {
			if ($rootScope.user === undefined) {
				$location.path("/home");
			} else {
				FormService.findAllFormForUser($rootScope.user.id, updateForms);
				$scope.formName = "";
			}
		}
	}
})();