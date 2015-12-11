alinaApp.controller('groupListController', 
function ($scope, $rootScope, $location, $window, groupService, userService, dialogs) {

	$scope.pageClass = 'page-standard';

	groupService.getGroups(function (response) {

		$scope.groups = response.data;
	}, 
	function (response) {

		$rootScope.error = response.error;
	});

	$scope.view = function (id) {

		$location.path('groups/view/' + id);
	};

	$scope.edit = function (id) {

		$location.path('groups/edit/' + id);
	};

	$scope.delete = function (id, index) {

		var confirmDialog = dialogs.confirm('Delete Group', 'Are you sure to delete the group?', {size: 'sm'});
		confirmDialog.result.then(
			function(btn) {
						
				groupService.deleteGroup(function () {

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

	$scope.add = function () {
		$location.path('groups/create');
	};
});
