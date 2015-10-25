"use strict";
(function() {
	angular
		.module("FormBuilderApp")
		.factory("FormService", FormService);

	function FormService($http) {
		var forms = [];
		var FormService = {
			createFormForUser : createFormForUser,
			findAllFormForUser : findAllFormForUser,
			deleteFormById : deleteFormById,
			updateFormById : updateFormById
		};

		function guid() {
		    function s4() {
		        return Math.floor((1 + Math.random()) * 0x10000)
		        .toString(16)
		        .substring(1);
		    }
		    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
		        s4() + '-' + s4() + s4() + s4();
		}

		function createFormForUser(userId, form, callback) {
			form.id = guid();
			form.userid = userId;
			forms.push(form);
			callback(form);
		}

		function findAllFormForUser(userId, callback) {
			var allFormForUser = [];
			for (var i = 0; i < forms.length; ++i) {
				if (forms[i].userid == userId) {
					allFormForUser.push(forms[i]);
				}
			}
			callback(allFormForUser);
		}

		function deleteFormById(formId, callback) {
			for (var i = 0; i < forms.length; ++i) {
				if (forms[i].id == formId) {
					forms.splice(i, i + 1);
					callback(forms);
				}
			}
		}

		function updateFormById(formId, newForm, callback) {
			for (var i = 0; i < forms.length; ++i) {
				if (forms[i].id == formId) {
					for (var property in newForm) {
						forms[i][property] = newForm[property];
					}
				}
				callback(forms[i]);
			}
		}
	}
})();