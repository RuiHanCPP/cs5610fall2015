"use strict";
(function() {
	angular
		.module("FormBuilderApp")
		.factory("UserService", UserService);

	function UserService($http) {
		var users = [];

		var UserService = {
			findAllUsers : findAllUsers,
			findUserByUsernameAndPassword : findUserByUsernameAndPassword,
			createUser : createUser,
			deleteUserById : deleteUserById,
			updateUser : updateUser
		};
		return UserService;

		function guid() {
		    function s4() {
		        return Math.floor((1 + Math.random()) * 0x10000)
		        .toString(16)
		        .substring(1);
		    }
		    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
		        s4() + '-' + s4() + s4() + s4();
		}

		function findUserByUsernameAndPassword(username, password, callback) {
			for (var i = 0; i < users.length; ++i) {
				if (users[i].username == username && users[i].password == password) {
					callback(users[i]);
				}
			}
			callback(null);
		}

		function findAllUsers(callback) {
			callback(users);
		}

		function createUser(user, callback) {
			user.id = guid();
			users.push(user);
			callback(user);
		}

		function deleteUserById(id, callback) {
			for (var i = 0; i < users.length; ++i) {
				if (users[i].id == id) {
					users.splice(i, i + 1);
					callback(users);
				}
			}
		}

		function updateUser(id, user, callback) {
			for (var i = 0; i < users.length; ++i) {
				if (users[i].id == id) {
					for (var property in user) {
						users[i][property] = user[property];
					}
					callback(users[i]);
				}
			}
		}
	}
})();