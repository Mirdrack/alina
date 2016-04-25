alinaApp.controller('resetController', ['$scope', '$window', '$location', '$timeout', 'userService',  
function ($scope, $window, $location, $timeout, userService) {

	$scope.pageClass = 'page-standard';

	$scope.error = null;
	$scope.success = null;
	
	$scope.reset = function () {

		userService.resetPassword(function (response) {

			$scope.success = 'Your password has been reseted';
			$timeout(function () { 

				$location.path('signin'); 
			}, 2000);
			
		}, 
		function () {

			$scope.error = 'Failed on reset password.';
			console.log($scope.error);
		},
		$scope.user);
	}
}]);
