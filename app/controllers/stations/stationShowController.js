alinaApp.controller('stationShowController', function ($scope, $rootScope , $location, $routeParams, stationService) { 
	
	$scope.pageClass = 'page-standard';

	stationService.getStation(
		function (response) {

			$scope.station = response.data;
			console.log($scope.station.reads);
		},
		function (response){

			$scope.error = response.error;
		},
		$routeParams.id
	);

	console.log('stationShowController');
});