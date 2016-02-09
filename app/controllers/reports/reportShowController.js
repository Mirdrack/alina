alinaApp.controller('reportShowController', function ($scope, $location, $routeParams, reportService, urls) {

    // Setup the style for page
    $scope.pageClass = 'page-standard';

    // Function to handle the errors on chart generation
    errorChart = function (response) {

        $scope.error = response.error;
    };

    // We catch the paramters for the url
    $scope.stationId = $routeParams.stationId;
    $scope.start = $routeParams.start;
    $scope.end = $routeParams.end;
    $scope.lapse = $routeParams.lapse;

    $scope.xlsUrl  = urls.BASE + '/chart/generate-xls';
    $scope.xlsUrl += '/' + $scope.stationId;
    $scope.xlsUrl += '/' + $scope.start;
    $scope.xlsUrl += '/' + $scope.end;
    $scope.xlsUrl += '/' + $scope.lapse;

    // We setup the label for the charts
    if($scope.lapse == 'day')
        lapseLabel =  'Time (hours)';
    if($scope.lapse == 'month')
        lapseLabel =  'Time (days)';
    if($scope.lapse == 'year')
        lapseLabel =  'Time (months)';

    // Preparing the data to make the post request
    dynamicLevelPostData = {
        'station_id': $scope.stationId,
        'lapse': $scope.lapse,
        'start': $scope.start,
        'end': $scope.end,
        column: 'dynamic_level',
    };

    // We setup the general options for all charts
    var chartGeneralOptions = {
        type: 'lineChart',
        height: 450,
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
            axisLabel: 'Height (m)',
            tickFormat: function (d) {
                return d3.format('.02f')(d);
            },
            axisLabelDistance: 0
        },
        callback: function (chart) {
            console.log("Chart Rendered !!!");
        }
    };

    // Dynamic Level Chart
    reportService.getChartValues(
        function (response) {

            // We set the data for the chart, MUST be an array
            $scope.dynamicLevelData = [];
            $scope.dynamicLevelData.push(response.data);
            // We set the options for the chart
            $scope.dynamicLevelOptions = { chart: chartGeneralOptions };
        },
        errorChart,
        dynamicLevelPostData
    );

    // Voltage Chart
    // Preparing the data to make the post request
    voltagePostData = {
        'station_id': $scope.stationId,
        'lapse': $scope.lapse,
        'start': $scope.start,
        'end': $scope.end,
        'column': 'voltage',
    };

    reportService.getChartValues(
        function (response) {

            // We set the data for the chart, MUST be an array
            $scope.voltageData = [];
            $scope.voltageData.push(response.data);
            // We set the options for the chart
            $scope.voltageOptions = { chart: chartGeneralOptions };
        },
        errorChart,
        voltagePostData
    );

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
            // We set the options for the chart
            $scope.currentOptions = { chart: chartGeneralOptions };
        },
        errorChart,
        currentPostData
    );

    // Power Chart
    // Preparing the data to make the post request
    powerPostData = {
        'station_id': $scope.stationId,
        'lapse': $scope.lapse,
        'start': $scope.start,
        'end': $scope.end,
        'column': 'power',
    };
    
    reportService.getChartValues(
        function (response) {

            // We set the data for the chart, MUST be an array
            $scope.powerData = [];
            $scope.powerData.push(response.data);
            // We set the options for the chart
            $scope.powerOptions = { chart: chartGeneralOptions };
        },
        errorChart,
        powerPostData
    );
});
