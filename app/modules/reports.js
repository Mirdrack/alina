angular.module('reports', []).config(function ($routeProvider) {

	$routeProvider
		.when('/reports/make/:id', {
			templateUrl: 'pages/reports/make.html',
			controller: 'reportMakeController'
		})
		.when('/reports/show/:id', {
			templateUrl: 'pages/reports/show.html',
			controller: 'reportShowController'
		})
		;
});
