alinaApp.controller('stationSensorsListController', 
function ($scope, $rootScope, $location, stationSensorService) {

	$scope.pageClass = 'page-standard';

	stationSensorService.getSensorList(function (response) {

		$scope.stationSensors = response.data;
	}, 
	function (response) {

		$rootScope.error = response.error;
	});

	$scope.edit = function (id) {

		$location.path('station-sensors/edit/' + id);
	};

});
