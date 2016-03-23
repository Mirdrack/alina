angular.module('station-sensors', []).config(function ($routeProvider) {

	$routeProvider
		.when('/station-sensors', {
			templateUrl: 'pages/station-sensors/list.html',
			controller: 'stationSensorsListController'
		})
		.when('/station-sensors/edit/:id', {
			templateUrl: 'pages/station-sensors/edit.html',
			controller: 'stationSensorsEditController'
		})
		;
});
