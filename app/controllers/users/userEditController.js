alinaApp.controller('userEditController', function ($scope, $routeParams, userService) {

	$scope.pageClass = 'page-standard';

	$scope.user = userService.getUser(function (response) {

		//We print the data
		console.log(response.data);
		$scope.user = response.data;
	},
	function (response) {

		console.log(response.error);
	}, 
	$routeParams.id);


	//$scope.save = userService.updateUser();

	$scope.save = function () {

		userService.updateUser(function (response) 
		{
			console.log('==response==');
			console.log(response);
		},
		function (response) {

			console.log('==error==*');
			console.log(response);
		},
		$routeParams.id,
		$scope.user);


	}

});