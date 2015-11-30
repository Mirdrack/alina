angular.module('groups', []).config(function ($routeProvider) {

	$routeProvider
		.when('/groups', {
			templateUrl: 'pages/groups/list.html',
			controller: 'groupListController'
		})
		.when('/groups/view/:id', {
			templateUrl: 'pages/groups/view.html',
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