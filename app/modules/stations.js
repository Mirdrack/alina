angular.module('stations', []).config(function ($routeProvider) {

	$routeProvider
		.when('/stations/show/:id', {
			templateUrl: 'pages/stations/view.html',
			controller: 'stationShowController'
		})
		.when('/stations/alarms/:id', {
			templateUrl: 'pages/stations/alarms.html',
			controller: 'stationAlarmsController'
		});
});