alinaApp.controller('stationEditController', function ($scope, $routeParams, $location, stationService) {

	$scope.pageClass = 'page-standard';

	stationService.getStation(function (response) {

		$scope.station = response.data;
		console.log(response);
	},
	function (response) {

		console.log(response.error);

	}, 
	$routeParams.id);
});
