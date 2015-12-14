alinaApp.controller('userCreateController', function ($scope, $location, userService, groupService) {

	$scope.pageClass = 'page-standard';

	groupService.getGroups(
		function (response) {
			$scope.user = {groups: []};
			$scope.groups = response.data;
			$scope.basicGroups = [];
			$scope.basicGroups.push($scope.groups[1]);
			$scope.user.groups.push($scope.groups[1].id);
			$scope.groups.splice(1,1);

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

		});

	$scope.create = function () {

		userService.createUser(function (response) 
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
		$scope.user);
	};
});
