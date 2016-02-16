alinaApp.controller('stationShowController', 
function ($scope, $rootScope , $location, $routeParams, stationService, userService, urls) { 
	
	$scope.pageClass = 'page-standard';

	userService.getProfile(function (response) {

		$user = response.data;
	}, 
	function () {

		$rootScope.error = 'Failed to fetch profile data.';
	});

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

			if($scope.station.alarm_activated == true) {

				$scope.alarmStatus = 'On';
				$scope.btnAlarmLabel = 'Turn Alarm Off';
			}
			else {

				$scope.alarmStatus = 'Off';
				$scope.btnAlarmLabel = 'Turn Alarm On';
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

	socket.on('activate-alarm-server', function (data) {

		$scope.btnAlarmLabel = 'Turn Alarm Off';
		$scope.alarmStatus = 'On';
		$scope.$apply();
	});

	socket.on('deactivate-alarm-server', function (data) {

		$scope.btnAlarmLabel = 'Turn Alarm On';
		$scope.alarmStatus = 'Off';
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

			var event = {
				user_id: parseInt($user.id),
				station_id: id,
				event_type_id: 1,
				ip_address: clientIp,
			};

			var data = {
				event_type: 'station-on',
				message: 'The station has been turned on',
				event: event,
			};

			socket.emit('turn-on', data);

		}
		if($scope.status == 'On') {

			var event = {
				user_id: parseInt($user.id),
				station_id: id,
				event_type_id: 2,
				ip_address: clientIp,
			};

			var data = {
				event_type: 'station-off',
				message: 'The station has been turned off',
				event: event,
			};

			socket.emit('turn-off', data);
		}
	}

	$scope.changeAlarmStatus = function (id) {

		if($scope.status == 'Off') {

			var event = {
				user_id: parseInt($user.id),
				station_id: id,
				event_type_id: 3,
				ip_address: clientIp,
			};

			var data = {
				event_type: 'alarm-activated',
				message: 'Alarm has been activated',
				event: event,
			};	

			socket.emit('activate-alarm', data);

		}
		if($scope.status == 'On') {

			var event = {
				user_id: parseInt($user.id),
				station_id: id,
				event_type_id: 4,
				ip_address: clientIp,
			};

			var data = {
				event_type: 'alarm-deactivated',
				message: 'Alarm has been activated',
				event: event,
			};

			socket.emit('deactivate-alarm', data);
		}
	}

});