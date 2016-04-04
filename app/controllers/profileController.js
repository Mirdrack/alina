alinaApp.controller('profileController', ['$rootScope', '$scope', '$window', 'userService', 'authService', 
function ($rootScope, $scope, $window, userService, authService) {

	$scope.pageClass = 'page-standard';
	token = $window.localStorage['token'];

	userService.getProfile(function (response) {

		$scope.user = response.data;
	}, 
	function () {

		$scope.error = 'Failed to fetch profile data.';
	});

	$scope.changePassword = function () {

		userService.updatePassword(function (response) {

			console.log('Lets logout');
			authService.logout(function () {
				
				window.location = '/';
			});
		}, 
		function () {

			$scope.error = 'Failed on update password.';
			console.log($scope.error);
		},
		$scope.user);
	}

	

}]);