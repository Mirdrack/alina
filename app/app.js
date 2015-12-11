var alinaApp = angular.module('alinaApp', 
		['ngRoute', 'ngAnimate', 'dialogs.main', 'ui.bootstrap', 'users', 'groups' , 'stations']
	);

alinaApp.controller('navbarController', function ($scope, authService, $window) {

	$scope.logout = function () {
		console.log('Get out');
		authService.logout(function () {
			window.location = '/';
		});
	};
	$scope.token = $window.localStorage['token'];
});

alinaApp.controller('mainController', function ($scope, $window) {

	$scope.message = 'This is home page';
	$scope.pageClass = 'page-standard';
	$scope.token = $window.localStorage['token'];
});

alinaApp.controller('aboutController', function ($scope) {

	$scope.message = 'Contact page';
	$scope.pageClass = '';
});

alinaApp.controller('contactController', function ($scope) {

	$scope.message = 'The contact';
	$scope.pageClass = 'page-contact';
});

