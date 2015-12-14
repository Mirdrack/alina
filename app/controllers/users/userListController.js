alinaApp.controller('userListController', function ($scope, $rootScope, $location, userService, dialogs) {

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
		var confirmDialog = dialogs.confirm('Delete User', 'Are you sure to delete the user?', {size: 'sm'});
		confirmDialog.result.then(
			function(btn) {
						
				userService.deleteUser(function () {

					var row = angular.element(document.querySelector('#row-' + index));
					row.remove();
				},
				function (response) {
					
					$scope.error = response.error;
				},
				id);
			},
			function(btn) {

				console.log('We do nothing');
			});
	};

	$scope.new = function () {

		$location.path('users/create');
	}
});
