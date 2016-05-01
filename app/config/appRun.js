alinaApp.run(function ($rootScope, $location, $window, userService) {

	$rootScope.$on('$routeChangeStart', function (event, next) {

		var url = $location.$$url;
		if(
			$window.localStorage['token'] == null && url != '/recovery' && url != '/reset') {
			
			$location.path('/signin');
		}

		userService.checkPermissions(function (response) {

			var permissions = response.data;

			// Checking for users sections
			if(url.indexOf('/users') > -1) {

				if(!permissions.users)
					$location.path('/forbidden');
			}

			// Checking for users sections
			if(url.indexOf('/groups') > -1) {

				if(!permissions.groups)
					$location.path('/forbidden');
			}

			// Checking for station sensors sections
			if(url.indexOf('/station-sensors') > -1) {

				if(!permissions.station_sensors)
					$location.path('/forbidden');
			}

			// Checking for station alarms
			if(url.indexOf('/alarms') > -1) {

				if(!permissions.alarms_stations)
					$location.path('/forbidden');
			}

			// Checking for station events
			if(url.indexOf('/events') > -1) {

				if(!permissions.events_stations)
					$location.path('/forbidden');
			}

			// Checking for station events
			if(url.indexOf('/stations') > -1) {

				if(url.indexOf('/stations/show') > -1) {

					if(!permissions.view_stations)
						$location.path('/forbidden');
				}

				if(url.indexOf('/stations/edit') > -1) {

					if(!permissions.station_config)
						$location.path('/forbidden');
				}
			}
		},
		function () {

			console.log('Failed to fetch user permissions.');
		});

	});
});
