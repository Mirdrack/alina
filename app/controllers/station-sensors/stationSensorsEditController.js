alinaApp.controller('stationSensorsEditController', function ($scope, $routeParams, $location, stationSensorService) {

	$scope.pageClass = 'page-standard';

	stationSensorService.getSensor(function (response) {

		$scope.sensor = response.data;
		console.log(response.data);
		
	},
	function (response) {

		console.log(response.error);
	}, 
	$routeParams.id);


	$scope.save = function () {

		stationSensorService.updateSensor(function (response) 
		{
				/*
				TO DO:
				We should catch the response.message and send it 
				to the sensor list on a flash message
				*/
				console.log(response.message);
			
			$location.path('station-sensors');
		},
		function (response) {

			$scope.error = response.error;
		},
		$routeParams.id,
		$scope.sensor);
	}

	$('#notification-phones').trigger('autoresize');
	$('#notification-emails').trigger('autoresize');
	$('#notification-text').trigger('autoresize');

});
