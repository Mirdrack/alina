alinaApp.controller('userCreateController', function ($scope, $location, userService) {

	$scope.pageClass = 'page-standard';

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