angular.module('groups', []).config(function ($routeProvider) {

	$routeProvider
		.when('/groups', {
			templateUrl: 'pages/groups/list.html',
			controller: 'groupListController'
		})
		.when('/groups/show/:id', {
			templateUrl: 'pages/groups/show.html',
			controller: 'groupShowController'
		})
		.when('/groups/create', {
			templateUrl: 'pages/groups/create.html',
			controller: 'groupCreateController'
		})
		.when('/groups/edit/:id', {
			templateUrl: 'pages/groups/edit.html',
			controller: 'groupEditController'
		});
});