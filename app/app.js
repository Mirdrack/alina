var alinaApp = angular.module('alinaApp', [
	'ngRoute', 
	'ngAnimate',
	'pages',
	'sessions', 
	'users', 
	'groups',
	'stations',
	'reports',
	'station-alarms',
	'station-sensors',
	'ui.materialize',
	'timer',
]);

alinaApp.controller('navbarController', function ($scope, $window, authService, userService) {

	$scope.token = $window.localStorage['token'];

	if($window.localStorage['token'])
	{
		userService.getProfile(function (response) {

			$scope.user = response.data;
		}, 
		function () {

			console.log('Failed to fetch profile data.');
		});

		userService.checkPermissions(function (response) {

			$scope.userPermissions = response.data;
			console.log($scope.userPermissions);
		},
		function () {

			console.log('Failed to fetch user permissions.');
		});
	}

	$scope.logout = function () {
		console.log('Get out!');
		authService.logout(function () {
			window.location = '/';
		});
	};

	jQuery('.button-collapse').sideNav();
});

alinaApp.controller('mainController', function ($scope, $window) {

	$scope.message = 'This is home page';
	$scope.pageClass = 'page-standard';
	$scope.token = $window.localStorage['token'];
});

alinaApp.controller('aboutController', function ($scope) {

	$scope.message = 'Contact page';
	$scope.pageClass = 'page-standard';
});
