angular.module('stations', []).config(function ($routeProvider) {

	$routeProvider
		.when('/stations', {
			templateUrl: 'pages/stations/list.html',
			controller: 'stationListController'
		})
		.when('/stations/show/:id', {
			templateUrl: 'pages/stations/view.html',
			controller: 'stationShowController'
		})
		.when('/stations/edit/:id', {
			templateUrl: 'pages/stations/edit.html',
			controller: 'stationEditController'
		})
		.when('/stations/alarms/:id', {
			templateUrl: 'pages/stations/alarms.html',
			controller: 'stationAlarmsController'
		})
		.when('/stations/events/:id', {
			templateUrl: 'pages/stations/events.html',
			controller: 'stationEventsController'
		});
});