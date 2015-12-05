angular.module('stations', []).config(function ($routeProvider) {

	$routeProvider
		.when('/stations/view/:id', {
			templateUrl: 'pages/stations/view.html',
			controller: 'stationShowController'
		});
});