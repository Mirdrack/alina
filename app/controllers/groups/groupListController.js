alinaApp.controller('groupListController', 
function ($scope, $rootScope, $location, $window, groupService) {

	$scope.pageClass = 'page-standard';
	$scope.idToDelete = null;

	groupService.getGroups(function (response) {

		$scope.groups = response.data;
	}, 
	function (response) {

		$rootScope.error = response.error;
	});

	$scope.view = function (id) {

		$location.path('groups/show/' + id);
	};

	$scope.edit = function (id) {

		$location.path('groups/edit/' + id);
	};

	$scope.delete = function (event) {

		event.preventDefault();
		
		groupService.deleteGroup(function () {

			var row = angular.element(document.querySelector('#row-' + $scope.idToDelete));
			row.remove();
		},
		function (response) {
					
			$scope.error = response.error;
		},
		$scope.idToDelete);
	};

	$scope.new = function () {
		$location.path('groups/create');
	};

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
