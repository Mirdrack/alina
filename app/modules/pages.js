angular.module('pages', []).config(function ($routeProvider) {

	$routeProvider
		.when('/', {
			templateUrl: 'pages/home.html',
			controller: 'mainController'
		})
		.when('/home', {
			templateUrl: 'pages/home.html',
			controller: 'mainController'
		})
		.when('/about', {
			templateUrl: 'pages/about.html',
			controller: 'aboutController'
		})
		.when('/profile', {
			templateUrl: 'pages/users/profile.html',
			controller: 'profileController'
		})
		.when('/recovery', {
			templateUrl: 'pages/recovery.html',
			controller: 'profileController'
		})
		;
});
