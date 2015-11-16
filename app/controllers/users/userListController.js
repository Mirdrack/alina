alinaApp.controller('userListController', function ($scope, $rootScope, $location, userService) {

	$scope.pageClass = 'page-standard';

	userService.getUsers(function (response) {

		$scope.users = response.data;
	}, 
	function (response) {

		$rootScope.error = response.error;
	});

	$scope.view = function (id) {

		$location.path('users/show/' + id);
	};

	$scope.edit = function (id) {

		$location.path('users/edit/' + id);
	};

	$scope.delete = function (id) {

		console.log('delete'); 
	};

	$scope.new = function () {

		$location.path('users/create');
	}
});
