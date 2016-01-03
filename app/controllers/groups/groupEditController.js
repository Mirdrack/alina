alinaApp.controller('groupEditController', function ($scope, $routeParams, $location, groupService) {

	$scope.pageClass = 'page-standard';

	groupService.getPermissions(
		function (response) {

			$scope.permissions = response.data;

			groupService.getGroup(
			function (response) {

				$scope.group = response.data;
				for(var x = 0;$scope.permissions.length < x; x++) {
					var o = jQuery.inArray($scope.permissions[x], $scope.group.permissions);
					if(o > -1) {
						$scope.permissions.splice(o,1);
					}
				}

				jQuery('#listPerms , #groupPerms').sortable({
					connectWith: '.dragg-connected'
				}).disableSelection();
				jQuery('#listPerms').on('sortreceive', function (event, ui) {

					$scope.group.permissions.splice(jQuery.inArray(ui.item[0].value, $scope.group.permissions), 1);
					console.log($scope.group.permissions);
				});
				jQuery('#groupPerms').on('sortreceive', function (event, ui) {

					$scope.group.permissions.push(ui.item[0].value);
					console.log($scope.group.permissions);
				});
			},
			function (response) {

				$scope.groupError = response.error
			}, 
			$routeParams.id
			);

		},
		function (response) {

			$scope.permissionsError = response.error;
		}
	);



	$scope.save = function () {

		groupService.updateGroup(
			function (response) {
				/*
					TO DO:
					We should catch the response.message and send it 
					to the user list on a flash message
					console.log(response.message);
				*/
				$location.path('groups');
			},
			function (response) {

				console.log(response.error);
			},
			$routeParams.id,
			$scope.group
		);
	};

});
