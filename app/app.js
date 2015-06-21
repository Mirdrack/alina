var alinaApp = angular.module('alinaApp', ['ngRoute']);

alinaApp.config(function ($routeProvider) {

	$routeProvider
		.when('/', {
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
		});
});

alinaApp.controller('mainController', function ($scope) {

	$scope.message = 'This is home page';
});

alinaApp.controller('aboutController', function ($scope) {

	$scope.message = 'Contact page';
});

alinaApp.controller('contactController', function ($scope) {

	$scope.message = 'The contact';
});