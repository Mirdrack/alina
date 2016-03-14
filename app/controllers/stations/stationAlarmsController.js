alinaApp.controller('stationAlarmsController',
function ($scope, $rootScope, $routeParams, stationAlarmService, stationService, urls) {

	$scope.pageClass = 'page-standard';

	stationService.getStation(
		function (response) {

			$scope.station = response.data;
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

	stationAlarmService.getStationAlarmsList(function (response) {

		$scope.stationAlarms = response.data.station_alarms;
		$scope.paginator = response.data.paginator;
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

	// We init the socket
	var clientId = Math.floor((Math.random() * 10) + 1);
	var socket = io(urls.BASE_NODE, { query: 'clientName=Alina-alarms-' + clientId });

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

	$scope.changeAlarmStatus = function (id) {

		console.log(id);
		if($scope.alarmStatus == 'Off') {

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
		if($scope.alarmStatus == 'On') {

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
	};

	$scope.setStationToChangeStatus = function (event, id) {

		event.preventDefault();
		//$scope.idToDelete = id;
		$('#deactivate-modal').openModal();
	}

	$scope.closeModal = function (event) {
		
		event.preventDefault();
		$('#deactivate-modal').closeModal();
	};

});
