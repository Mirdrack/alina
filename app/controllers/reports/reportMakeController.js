alinaApp.controller('reportMakeController', function ($scope, $location, $routeParams, stationService) {

	$scope.pageClass = 'page-standard';
	$scope.error = null;
	$scope.report = {};
	$scope.report.stationId = $routeParams.id;
	$scope.report.type = 'day';
	$scope.report.day = null;
	$scope.report.month = null;
	$scope.report.year = null;

	$scope.report.lapseOptions = [
		{ value: 'day', label: 'Day' },
		{ value: 'month', label: 'Month' },
		{ value: 'year', label: 'Year' },
	];

  	$scope.report.monthOptions = [
  		{ value: 1, label: 'January' },
  		{ value: 2, label: 'February' },
  		{ value: 3, label: 'March' },
  		{ value: 4, label: 'April' },
  		{ value: 5, label: 'May' },
  		{ value: 6, label: 'June' },
  		{ value: 7, label: 'July' },
  		{ value: 8, label: 'August' },
  		{ value: 9, label: 'September' },
  		{ value: 10, label: 'Octuber' },
  		{ value: 11, label: 'November' },
  		{ value: 12, label: 'December' },
  	];

  	$scope.report.yearOptions = [
		{ value: 2016, label: '2016' },
  		{ value: 2017, label: '2017' },
  		{ value: 2018, label: '2018' },
  		{ value: 2019, label: '2019' },
  		{ value: 2020, label: '2020' },
  	];

  	var currentTime = new Date();
	$scope.currentTime = currentTime;
	$scope.month = [
		'Januar', 'February', 'March', 'April', 'May', 'June', 
		'July', 'August', 'September', 'October', 'November', 'December'
	];
	$scope.monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	$scope.weekdaysFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	$scope.weekdaysLetter = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
	$scope.maxDate = currentTime.toISOString();


	

  	// ===================================================

	stationService.getStationsList(function (response) {

		$scope.stations = response.data;
	}, 
	function (response) {

		$rootScope.error = response.error;
	});

	// ===================================================

	$scope.generate = function () {


		var canGenerateReport = false;
		canGenerateReport = checkStation();
		if(canGenerateReport) {

			if($scope.report.type == 'day')
			{
				var day = $scope.report.day.split('/');
				day = new Date(day[2], day[1] - 1, day[0]);
				firstDay = day.toISOString().substring(0, 10);
				lastDay = day.toISOString().substring(0, 10);
			}
			if($scope.report.type == 'month')
			{
				var date = new Date($scope.report.year, $scope.report.month - 1, 1);
				var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
				var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
				firstDay = firstDay.toISOString().substring(0, 10);
				lastDay = lastDay.toISOString().substring(0, 10);
			}
			if($scope.report.type == 'year')
			{
				var firstDay = new Date($scope.report.year, 0, 1);
				var lastDay = new Date($scope.report.year, 11, 31);
				firstDay = firstDay.toISOString().substring(0, 10);
				lastDay = lastDay.toISOString().substring(0, 10);
			}
			var reportShowUrl = ''; 
			reportShowUrl += 'reports/show/' + $scope.report.stationId;
			reportShowUrl += '/' + firstDay + '/' + lastDay 
			reportShowUrl += '/' + $scope.report.type;
			
			$location.path(reportShowUrl);
		}
	}

	function checkStation()
	{
		if($scope.report.stationId == null)
		{
			$scope.error = 'Station must be selected';
			return false;
		}
		else
			return checkType();
	}

	function checkType()
	{
		if($scope.report.type == null)
		{
			$scope.error = 'Type of report must be selected';
			return false;
		}
		else
			return checkTimeLapse();
	}

	function checkTimeLapse()
	{
		if($scope.report.type == 'day' && $scope.report.day == null)
		{
			$scope.error = 'You must select a day to generate the report';
			return false;
		}
		if($scope.report.type == 'month' && $scope.report.month == null)
		{
			$scope.error = 'You must select a month to generate the report';
			return false;
		}
		if($scope.report.type == 'year' && $scope.report.year == null)
		{
			$scope.error = 'You must select a year to generate the report';
			return false;
		}
		$scope.error = null;
		return true;
	}



});

