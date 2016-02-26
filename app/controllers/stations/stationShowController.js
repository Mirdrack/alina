alinaApp.controller('stationShowController', 
function ($scope, $rootScope , $location, $routeParams, stationService, userService, reportService, urls) { 
	
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

	// Chart generation 

	// Function to handle the errors on chart generation
    errorChart = function (response) {

        $scope.error = response.error;
    };

    // We catch the paramters for the url
    $scope.stationId = $routeParams.id;
    $scope.start = (new Date()).toISOString().substring(0, 10)
    $scope.end = (new Date()).toISOString().substring(0, 10)
    $scope.lapse = 'day';

    // We setup the label for the charts
    var lapseLabel =  'Time (hours)';
    
    // We setup the general options for all charts
    var chartGeneralOptions = {
        type: 'lineChart',
        height: 200,
        margin : {
            top: 20,
            right: 20,
            bottom: 20,
            left: 60
        },
        x: function(d){ return d.x; },
        y: function(d){ return d.y; },
        useInteractiveGuideline: true,
        dispatch: {
            stateChange: function(e){ console.log("stateChange"); },
            changeState: function(e){ console.log("changeState"); },
            tooltipShow: function(e){ console.log("tooltipShow"); },
            tooltipHide: function(e){ console.log("tooltipHide"); }
        },
        xAxis: {
            axisLabel: lapseLabel,
            tickFormat: d3.format('02d')
        },
        yAxis: {
            axisLabel: '',
            tickFormat: function (d) {
                return d3.format('.02f')(d);
            },
            axisLabelDistance: 0
        },
        callback: function (chart) {
            console.log("Chart Rendered !!!");
        }
    };

    // Current Chart
    // Preparing the data to make the post request
    currentPostData = {
        'station_id': $scope.stationId,
        'lapse': $scope.lapse,
        'start': $scope.start,
        'end': $scope.end,
        'column': 'current',
    };

    reportService.getChartValues(
        function (response) {

            // We set the data for the chart, MUST be an array
            $scope.currentData = [];
            $scope.currentData.push(response.data);
            // We assing the label for the y axis
            chartGeneralOptions.yAxis.axisLabel = 'Ampers (A)';
            // We set the options for the chart
            $scope.currentOptions = { chart: chartGeneralOptions };
        },
        errorChart,
        currentPostData
    );

});