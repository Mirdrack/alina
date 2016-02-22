angular.module('station-alarms', []).config(function ($routeProvider) {

	$routeProvider
		.when('/station-alarms', {
			templateUrl: 'pages/station-alarms/list.html',
			controller: 'stationAlarmsListController'
		});
});
