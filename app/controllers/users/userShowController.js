alinaApp.controller('userShowController', function ($scope, $routeParams, userService) {

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

});
