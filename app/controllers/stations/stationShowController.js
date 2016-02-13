alinaApp.controller('stationShowController', function ($scope, $rootScope , $location, $routeParams, stationService, urls) { 
	
	$scope.pageClass = 'page-standard';

	stationService.getStation(
		function (response) {

			$scope.station = response.data;
			if($scope.station.status == true) {
				
				$scope.status = 'On';
				$scope.btnLabel = 'Turn Off';
			}
			else {

				$scope.status = 'Off';
				$scope.btnLabel = 'Turn On';
			}
		},
		function (response){

			$scope.error = response.error;
		},
		$routeParams.id
	);

	// We init the socket
	var clientId = Math.floor((Math.random() * 10) + 1);
	var socket = io(urls.BASE_NODE, { query: 'clientName=Alina-' + clientId });

	socket.on('new-read-server', function (data) {

		$scope.station.reads.pop();
		$scope.station.reads.unshift(data.data);
		$scope.$apply();
	});

	socket.on('turn-on-server', function (data) {

		$scope.btnLabel = 'Turn Off';
		$scope.status = 'On';
		$scope.$apply();
	});

	socket.on('turn-off-server', function (data) {

		$scope.btnLabel = 'Turn On';
		$scope.status = 'Off';
		$scope.$apply();
	});

	socket.on('error-server', function (data) {

		console.log(data);
	});

	$scope.makeReport = function (id) {

		$location.path('reports/make/' + id);
	}

	$scope.changeStatus = function (id) {

		if($scope.status == 'Off') {

			socket.emit('turn-on', {'id' : id});
		}
		if($scope.status == 'On') {

			socket.emit('turn-off', {'id' : id});
		}
	}

});