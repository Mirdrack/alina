alinaApp.controller('groupShowController', function ($scope,$rootScope , $location, $routeParams, groupService, dialogs) {
	
	$scope.pageClass = 'page-standard';

	groupService.getGroup(
		function (response) {

			$scope.group = response.data
			console.log($scope.group);
		},
		function (response) {

			$scope.error = response.error;
		},
		$routeParams.id
	);

	$scope.edit = function (id) {

		$location.path('groups/edit/' + id);
	};

	$scope.delete = function (id) {

		var confirmDialog = dialogs.confirm('Delete Group', 'Are you sure to delete this group?', {size: 'sm'});
		confirmDialog.result.then(
			function(btn) {
						
				groupService.deleteGroup(function () {

					$location.path('/groups');
				},
				function (response) {
					
					$scope.error = response.error;
				},
				id);
			},
			function(btn) {

				console.log('We do nothing');
			}
		);
	};
});