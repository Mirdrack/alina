var alinaApp = angular.module('alinaApp', ['ngRoute', 'ngAnimate']);

alinaApp.config(function ($routeProvider) {

	$routeProvider
		.when('/', {
			templateUrl : 'pages/home.html',
			controller : 'mainController'
		})
		.when('/home', {
			templateUrl : 'pages/home.html',
			controller : 'mainController'
		})
		.when('/about', {
			templateUrl : 'pages/about.html',
			controller : 'aboutController'
		})
		.when('/contact', {
			templateUrl : 'pages/contact.html',
			controller : 'contactController'
		})
		.when('/signup', {
			templateUrl : 'pages/signup.html',
			controller : 'sessionController'
		})
		.when('/signin', {
			templateUrl : 'pages/signin.html',
			controller : 'sessionController'
		});
})
.constant('urls', {
	BASE: 'http://rea.app',
	BASE_API: 'http://api.jwt.dev:8000/v1'
});

alinaApp.controller('mainController', function ($scope) {

	$scope.message = 'This is home page';
	$scope.pageClass = 'page-home';
});

alinaApp.controller('aboutController', function ($scope) {

	$scope.message = 'Contact page';
	$scope.pageClass = 'page-about';
});

alinaApp.controller('contactController', function ($scope) {

	$scope.message = 'The contact';
	$scope.pageClass = 'page-contact';
});

