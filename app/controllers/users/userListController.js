alinaApp.controller('userListController', function ($scope, $rootScope, $location, userService) {

	$scope.pageClass = 'page-standard';
	$scope.idToDelete = null;

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

	$scope.delete = function (event) {
		
		event.preventDefault();
		console.log('delete'); 
		console.log($scope.idToDelete); 
		
		/* Commented until we translate the add section		
		userService.deleteUser(function () {

			var row = angular.element(document.querySelector('#row-' + index));
			row.remove();
		},
		function (response) {
					
			$scope.error = response.error;
		},
		$scope.idToDelete);
		*/
	};

	$scope.new = function () {

		$location.path('users/create');
	}

	$scope.closeModal = function (event) {
		
		event.preventDefault();
		$('#delete-modal').closeModal();
	};

	$scope.setIdToDelete = function (event, id) {

		event.preventDefault();
		$scope.idToDelete = id;
		$('#delete-modal').openModal();
	}
});
