angular.module('users', []).config(function ($routeProvider) {

	$routeProvider
		.when('/users', {
			templateUrl: 'pages/users/list.html',
			controller: 'userListController'
		})
		.when('/users/show/:id', {
			templateUrl: 'pages/users/show.html',
			controller: 'userShowController'
		})
		;
});
