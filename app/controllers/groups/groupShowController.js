alinaApp.controller('groupShowController', function ($scope, $location, $routeParams, groupService) {
	
	$scope.pageClass = 'page-standard';

	groupService.getGroup(
		function (response) {

			$scope.group = response.data
			//console.log('response.data = ' + response.data);
		},
		function (response){

			console.log(response.data);
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