alinaApp.controller('userController', function ($scope, $rootScope, userService) {

	$scope.pageClass = 'page-contact';

	userService.getUsers(function (response) {

		$scope.users = response.data;
	}, 
	function () {

		$rootScope.error = 'Failed to retrieve users.';
	});
});
