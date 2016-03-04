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

	$scope.changePage = function (page) {

		stationEventService.getStationEventsList(function (response) {

			$scope.stationEvents = response.data.station_events;
			$scope.paginator = response.data.paginator;
		}, 
		function (response) {

			$rootScope.error = response.error;
		}, page);
	};

	console.log('stationEventsController');

	


});
