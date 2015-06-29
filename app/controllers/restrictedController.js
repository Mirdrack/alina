alinaApp.controller('restrictedController', ['$rootScope', '$scope', 'dataService', 

function ($rootScope, $scope, dataService) {

	dataService.getRestrictedData(function (res) {

		$scope.data = res.data;

	}, function () {

		$rootScope.error = 'Failed to fetch restricted content.';
		
	});

}]);