alinaApp.controller('stationShowController', function ($scope, $rootScope , $location, $routeParams, stationService) { 
	
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

	console.log('stationShowController');
	var socket = io('http://localhost:8000');
	console.log(typeof(socket));

	socket.on('new-read-server', function (data) {

		$scope.station.reads.pop();
		$scope.station.reads.unshift(data.data);
		$scope.$apply();
	});

});