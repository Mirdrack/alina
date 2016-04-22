alinaApp.controller('stationListController', function ($scope, $rootScope, $location, stationService) {

	$scope.pageClass = 'page-standard';

	stationService.getStations(function (response) {

		$scope.stations = response.data;
	}, 
	function (response) {

		$rootScope.error = response.error;
	});

	$scope.view = function (id) {

		$location.path('stations/show/' + id);
	};

	$scope.edit = function (id) {

		$location.path('stations/edit/' + id);
	};
});
