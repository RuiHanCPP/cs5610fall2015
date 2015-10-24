(function() {
	angular
		.module("FormBuilderApp")
		.config(Configure);

	function Configure($routeProvider) {
		$routeProvider
			.when("/home", {
				templateURL: "home/home.view.html" //TODO
			})
			.when("/login", {
				templateURL: "login/login.view.html"
				controller: "LoginController"
			})；
	}
})();