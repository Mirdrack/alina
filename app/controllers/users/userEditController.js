alinaApp.controller('userEditController', function ($scope, $routeParams, $location, userService) {

	$scope.pageClass = 'page-standard';

	$scope.user = userService.getUser(function (response) {

		$scope.user = response.data;
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