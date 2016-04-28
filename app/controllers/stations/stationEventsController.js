alinaApp.controller('stationEventsController',
function ($scope, $rootScope, $routeParams, stationEventService, stationService, urls) {

	$scope.pageClass = 'page-standard';

	stationService.getStation(
		function (response) {

			$scope.station = response.data;
		},
		function (response){

			$scope.error = response.error;
		},
		$routeParams.id
	);

	stationEventService.getStationEventsList(function (response) {

		$scope.stationEvents = response.data.station_events;
		$scope.paginator = response.data.paginator;
	}, 
	function (response) {

		$rootScope.error = response.error;
	});

	$scope.changePage = function (page, filter) {

		stationEventService.getStationEventsList(function (response) {

			$scope.stationEvents = response.data.station_events;
			$scope.paginator = response.data.paginator;
		}, 
		function (response) {

			$rootScope.error = response.error;
		}, page, filter);
	};

	$scope.filter = {};
	$scope.filter.eventOptions = [
			{"value": 1, "label": "Encendido de pozo"},
			{"value": 2, "label": "Apagado de pozo"},
			{"value": 3, "label": "Encendido de alarma puerta pozo"},
			{"value": 4, "label": "Apagado de alarma puerta pozo"},
			{"value": 5, "label": "Encendido de alarma movimiento"},
			{"value": 6, "label": "Apagado de alarma movimiento"},
			{"value": 7, "label": "Encendido de alarma puerta irrigación"},
			{"value": 8, "label": "Apagado de alarma puerta irrigación"},
			{"value": 9, "label": "Encendido de alarma movimiento irrigación"},
			{"value": 10, "label": "Apagado de alarma movimiento irrigación"},
			{"value": 11, "label": "Puerta Abierta Cuarto Pozo"},
			{"value": 12, "label": "Puerta Cerrada Cuarto Pozo"},
			{"value": 13, "label": "Puerta Abierta Cuarto Riego"},
			{"value": 14, "label": "Puerta Cerrado Cuarto Riego"},
			{"value": 15, "label": "Movimiento Cuarto Pozo"},
			{"value": 16, "label": "Movimiento Cuarto Riego"},
			{"value": 17, "label": "Alarma Desactivada Manualmente"},
			{"value": 18, "label": "Alarma Activada Manualmente"}
		];
});
