alinaApp.controller('userShowController', function ($scope, $routeParams, userService) {

	$scope.pageClass = 'page-standard';

	$scope.user = userService.getUser(function (response) {

		$scope.user = response.data;
	},
	function (response) {

		console.log(response.error);
	}, 
	$routeParams.id);

});
