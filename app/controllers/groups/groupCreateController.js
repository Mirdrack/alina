alinaApp.controller('groupCreateController',function ($scope, $rootScope, $location, groupService) {

	$scope.pageClass = 'page-standard';

	$scope.group = {};
	$scope.group.resources = [];

	groupService.getPermissions(function (response) {

		$scope.resources = response.data;

		jQuery('#listPerms , #groupPerms').sortable({
			connectWith: '.dragg-connected'
		}).disableSelection();

		jQuery('#listPerms').on('sortreceive', function (event, ui) {

			$scope.group.resources.splice(jQuery.inArray(ui.item[0].value, $scope.group.resources), 1);
			console.log($scope.group.resources);
		});
		
		jQuery('#groupPerms').on('sortreceive', function (event, ui) {

			$scope.group.resources.push(ui.item[0].value);
			console.log($scope.group.resources);
		});
	},
	function () {

		console.log('Failed to retrieve permissions');
	});

	$scope.create = function () {

		groupService.createGroup($scope.group,
			function (response){

				// The API doesnt add the permissions
				$location.path('/groups');
			},
			function (response) {
				
				$scope.error = response.error;
			}
		);
	};
});
