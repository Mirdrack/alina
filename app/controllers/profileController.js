alinaApp.controller('profileController', ['$rootScope', '$scope', '$window', 'userService', 

function ($rootScope, $scope, $window, userService) {

	$scope.pageClass = 'page-standard';
	token = $window.localStorage['token'];

	userService.getProfile(function (response) {

		$scope.user = response.data;
	}, 
	function () {

		$rootScope.error = 'Failed to fetch profile data.';
	});

	

}]);