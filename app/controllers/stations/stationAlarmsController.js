alinaApp.controller('stationAlarmsListController', 
function ($scope, $rootScope, stationAlarmService, stationService) {

	$scope.pageClass = 'page-standard';

	stationService.getStationsList(function (response) {

		$scope.stations = response.data;
	},
	function (response) {

		$rootScope.error = response.error;
	});

	stationAlarmService.getStationAlarmsList(function (response) {

		$scope.stationAlarms = response.data.station_alarms;
		$scope.paginator = response.data.paginator;
		console.log(response.data.paginator);
	}, 
	function (response) {

		$rootScope.error = response.error;
	});

	$scope.changePage = function (page) {

		stationAlarmService.getStationAlarmsList(function (response) {

			$scope.stationAlarms = response.data.station_alarms;
			$scope.paginator = response.data.paginator;
		}, 
		function (response) {

			$rootScope.error = response.error;
		}, page);
	};
});
