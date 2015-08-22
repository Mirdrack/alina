angular.module('users', []).config(function ($routeProvider) {

	$routeProvider
		.when('/users', {
			templateUrl: 'pages/users/index.html',
			controller: 'userController'
		})
		;
});
