alinaApp.controller('groupEditController', function ($scope, $routeParams, $location, groupService) {

	$scope.pageClass = 'page-standard';

	groupService.getGroup(
		function (response) {

			$scope.group = response.data;
			$scope.groupName = $scope.group.name;
			$scope.groupLabel = $scope.group.label;
		},
		function (response) {

			console.log(response.error);
		}, 
		$routeParams.id
	);

	$scope.save = function () {

		$scope.group.name = $scope.groupName;
		$scope.group.label = $scope.groupLabel;
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