alinaApp.controller('groupShowController', function ($scope,$rootScope , $location, $routeParams, groupService) {
	
	$scope.pageClass = 'page-standard';

	groupService.getGroup(
		function (response) {

			$scope.group = response.data
			console.log($scope.group);
		},
		function (response){

			$scope.error = response.error;
		},
		$routeParams.id
	);

	$scope.edit = function (id) {

		$location.path('groups/edit/' + id);
	};

	$scope.delete = function (id) {

		groupService.deleteGroup(function () {

			$location.path('/groups');
		},
		function (response) {
			$scope.error = response.error;
		},
		id);
	};
});