alinaApp.controller('userController', function ($scope, userService) {

	$scope.pageClass = 'page-contact';

	userService.getProfile(function (response) {

		$scope.users = response.data;
		console.log($scope.users);
	}, 
	function () {

		$rootScope.error = 'Failed to retrieve users.';
	});
});
