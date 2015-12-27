angular.module('sessions', []).config(function ($routeProvider) {

	$routeProvider
		.when('/signup', {
			templateUrl: 'pages/signup.html',
			controller: 'sessionController'
		})
		.when('/signin', {
			templateUrl: 'pages/signin.html',
			controller: 'sessionController'
		})
		;
});
