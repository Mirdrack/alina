alinaApp.controller('userEditController', function ($scope, $routeParams, $location, userService, groupService) {

	$scope.pageClass = 'page-standard';

	userService.getUser(function (response) {

		$scope.user = response.data;
		$scope.user.groups = [];

		groupService.getGroups(
		function (response) {

			$scope.groups = response.data;

			for(var x = 0;$scope.groups.length < x; x++) {
				var o = jQuery.inArray($scope.groups[x], $scope.user.groups);
				if(o > -1) {
					$scope.groups.splice(o,1);
				}
			}

			jQuery('#userGroups , #availableGroups').sortable({
				
				connectWith: '.dragg-connected'
			}).disableSelection();
			
			jQuery('#availableGroups').on('sortreceive', function (event, ui) {

				$scope.user.groups.splice(jQuery.inArray(ui.item[0].value, $scope.user.groups), 1);
				console.log($scope.user.groups);
			});

			jQuery('#userGroups').on('sortreceive', function (event, ui) {

				$scope.user.groups.push(ui.item[0].value);
				console.log($scope.user.groups);
			});
		},
		function (response) {

			$scope.groupsError = response.error
		});
	},
	function (response) {

		console.log(response.error);

	}, 
	$routeParams.id);


	$scope.save = function () {

		userService.updateUser(function (response) 
		{
			/*
				TO DO:
				We should catch the response.message and send it 
				to the user list on a flash message
				console.log(response.message);
			*/
			$location.path('users');
		},
		function (response) {

			$scope.error = response.error;
		},
		$routeParams.id,
		$scope.user);
	}

});
