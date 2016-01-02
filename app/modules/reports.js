angular.module('reports', []).config(function ($routeProvider) {

	$routeProvider
		.when('/reports/make/:id', {
			templateUrl: 'pages/reports/make.html',
			controller: 'reportMakeController'
		})
		.when('/reports/show/:stationId/:start/:end', {
			templateUrl: 'pages/reports/show.html',
			controller: 'reportShowController'
		})
		;
});
