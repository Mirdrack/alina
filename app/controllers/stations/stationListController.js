alinaApp.controller('stationListController', function ($scope, $rootScope, $location, stationService, userService) {

	$scope.pageClass = 'page-standard';

	stationService.getStations(function (response) {

		$scope.stations = response.data;
	}, 
	function (response) {

		$rootScope.error = response.error;
	});

	userService.checkPermissions(function (response) {

		$scope.userPermissions = response.data;
	},
	function () {

		console.log('Failed to fetch user permissions.');
	});

	$scope.view = function (id) {

		$location.path('stations/show/' + id);
	};

	$scope.edit = function (id) {

		$location.path('stations/edit/' + id);
	};
});
