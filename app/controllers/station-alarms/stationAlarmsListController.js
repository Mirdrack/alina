alinaApp.controller('stationAlarmsListController', 
function ($scope, $rootScope, stationAlarmService) {

	$scope.pageClass = 'page-standard';

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
