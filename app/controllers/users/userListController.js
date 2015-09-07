alinaApp.controller('userListController', function ($scope, $rootScope, $location, userService) {

	$scope.pageClass = 'page-contact';

	userService.getUsers(function (response) {

		$scope.users = response.data;
		console.log('userListController');
	}, 
	function (response) {

		$rootScope.error = response.error;
	});

	$scope.view = function (id) {

		$location.path('users/show/' + id);
	};

	$scope.edit = function (id) {

		console.log('edit');
	};

	$scope.delete = function (id) {

		console.log('delete'); 
	};
});
