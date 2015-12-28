alinaApp.controller('reportMakeController', function ($scope, $location, $routeParams, stationService) {

	$scope.pageClass = 'page-standard';
	$scope.stationId = $routeParams.id;

	stationService.getStationsList(function (response) {

		$scope.stations = response.data;
	}, 
	function (response) {

		$rootScope.error = response.error;
	});

	$scope.reportType = 'day';
});
