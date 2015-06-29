alinaApp.controller('restrictedController', ['$rootScope', '$scope', 'dataService', 

function ($rootScope, $scope, dataService) {

	dataService.getRestrictedData(function (response) {

		$scope.data = response.data;
	}, function () {

		$rootScope.error = 'Failed to fetch restricted content.';
	});

}]);