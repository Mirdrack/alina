alinaApp.controller('groupListController', function ($scope, $rootScope, $location, $window, groupService, userService) {

	$scope.pageClass = 'page-standard';

	groupService.getGroups(function (response) {

		$rootScope.groups = response.data;
		console.log($rootScope.groups);
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

		groupService.deleteGroup(function () {
			var row = angular.element(document.querySelector('#row-' + index));
			row.remove();
		},
		function (response) {
			$scope.error = response.error;
		},
		id);
	};

	$scope.add = function () {
		$location.path('groups/create');
	};
});