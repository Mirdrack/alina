alinaApp.controller('stationEditController', function ($scope, $routeParams, $location, stationService) {

	$scope.pageClass = 'page-standard';

	stationService.getStation(function (response) {

		$scope.station = response.data;
		console.log(response);
	},
	function (response) {

		console.log(response.error);

	}, 
	$routeParams.id);

	$scope.save = function () {

		console.log($scope.station);
		stationService.updateStation(function (response) 
		{
			/*
				TO DO:
				We should catch the response.message and send it 
				to the station list on a flash message
				console.log(response.message);
			*/
			$location.path('stations');
		},
		function (response) {

			$scope.error = response.error;
		},
		$routeParams.id,
		$scope.station);
	}
});
