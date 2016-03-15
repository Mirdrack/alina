alinaApp.controller('stationAlarmsController',
function ($scope, $rootScope, $routeParams, stationAlarmService, stationSensorService, stationService, userService, urls) {

	$scope.pageClass = 'page-standard';

	$scope.cooldown = 1;

	userService.getProfile(function (response) {

		$scope.user = response.data;
	}, 
	function () {

		$rootScope.error = 'Failed to fetch profile data.';
	});

	stationService.getStation(
		function (response) {

			$scope.station = response.data;
		},
		function (response){

			$scope.error = response.error;
		},
		$routeParams.id
	);

	stationSensorService.getSensorList(
		function (response) {

			$scope.sensors = response.data;
			for(var cont = 0; cont < $scope.sensors.length; cont++) {

				if($scope.sensors[cont].alarm_activated == true) {

					$scope.sensors[cont].alarmStatus = 'On';
					$scope.sensors[cont].btnAlarmLabel = 'Turn Alarm Off';
				}
				else {

					var endTime = moment($scope.sensors[cont].alarm_turned_off_at);
					endTime.add($scope.sensors[cont].alarm_cooldown, 'minute');
					var now = moment();
					var diff = moment(endTime).diff(now);
					var diffSeconds = Math.floor(moment.duration(diff).asSeconds());

					
					$scope.sensors[cont].alarmStatus = 'Off';
					$scope.sensors[cont].btnAlarmLabel = 'Turn Alarm On';
					$scope.sensors[cont].endTime = diffSeconds;
				}		
			}
		},
		function (response){

			$scope.error = response.error;
		}
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

		eventTypeId = data.station_event.event_type_id;
		if(eventTypeId == 3)
		{
			$scope.sensors[0].alarmStatus = 'On';
			$scope.sensors[0].btnAlarmLabel = 'Turn Alarm Off';
			$scope.sensors[0].alarm_activated = true;
		}
		if(eventTypeId == 5)
		{
			$scope.sensors[1].alarmStatus = 'On';
			$scope.sensors[1].btnAlarmLabel = 'Turn Alarm Off';
			$scope.sensors[1].alarm_activated = true;
		}
		if(eventTypeId == 7)
		{
			$scope.sensors[2].alarmStatus = 'On';
			$scope.sensors[2].btnAlarmLabel = 'Turn Alarm Off';
			$scope.sensors[2].alarm_activated = true;
		}
		if(eventTypeId == 9)
		{
			$scope.sensors[3].alarmStatus = 'On';
			$scope.sensors[3].btnAlarmLabel = 'Turn Alarm Off';
			$scope.sensors[3].alarm_activated = true;
		}
		$scope.$apply();
	});

	socket.on('deactivate-alarm-server', function (data) {

		eventTypeId = data.station_event.event_type_id;
		if(eventTypeId == 4)
		{
			var endTime = moment(data.station_sensor.alarm_turned_off_at); // creo que ya tengo el dato
			endTime.add(data.station_sensor.alarm_cooldown, 'minute');  // creo que ya tengo el dato
			var now = moment();
			var diff = moment(endTime).diff(now);
			var diffSeconds = Math.floor(moment.duration(diff).asSeconds());


			$scope.sensors[0].alarmStatus = 'Off';
			$scope.sensors[0].btnAlarmLabel = 'Turn Alarm On';
			$scope.sensors[0].endTime = diffSeconds;
			$scope.sensors[0].alarm_activated = false;
			$scope.$apply();
		}
	});

	socket.on('error-server', function (data) {

		console.log(data);
	});

	$scope.changeStatusClick = function (event, sensor) {

		event.preventDefault();

		// If alarm is inactive
		if(!sensor.alarm_activated) {

			if(sensor.name == 'Maya') 
				eventTypeId = 3;
			if(sensor.name == 'Electra') 
				eventTypeId = 5;
			if(sensor.name == 'Hestia') 
				eventTypeId = 7;
			if(sensor.name == 'Aretusa') 
				eventTypeId = 9;

			var event = {
				user_id: parseInt($scope.user.id),
				station_id: parseInt(sensor.station_id),
				event_type_id: eventTypeId,
				ip_address: clientIp,
			};

			var data = {
				event_type: 'alarm-activated',
				message: 'Alarm has been activated',
				event: event,
			};

			socket.emit('activate-alarm', data);
		}
		else {

			$scope.sensorToHandle = sensor;
			$('#deactivate-modal').openModal();
		}
	}

	$scope.deactivateAlarm = function (event) {

		event.preventDefault();

		if($scope.sensorToHandle.name == 'Maya') 
			eventTypeId = 4;
		if($scope.sensorToHandle.name == 'Electra') 
			eventTypeId = 6;
		if($scope.sensorToHandle.name == 'Hestia') 
			eventTypeId = 8;
		if($scope.sensorToHandle.name == 'Aretusa') 
			eventTypeId = 10;

		var event = {
			user_id: parseInt($scope.user.id),
			station_id: parseInt($scope.sensorToHandle.station_id),
			event_type_id: eventTypeId,
			ip_address: clientIp,
			alarm_cooldown: $scope.cooldown,
		};

		var data = {
			event_type: 'alarm-deactivated',
			message: 'Alarm has been activated',
			event: event,
		};

		socket.emit('deactivate-alarm', data);
	}

	$scope.closeModal = function (event) {
		
		$scope.sensorToHandle = null;
		$scope.cooldown = 1;
		event.preventDefault();
		$('#deactivate-modal').closeModal();
	}

});
