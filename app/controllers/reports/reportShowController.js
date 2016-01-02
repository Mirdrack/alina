alinaApp.controller('reportShowController', function ($scope, $location, $routeParams) {

	$scope.pageClass = 'page-standard';

	$scope.stationId = $routeParams.id;
	$scope.start = $routeParams.start;
	$scope.end = $routeParams.end;

});
