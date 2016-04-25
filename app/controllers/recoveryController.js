alinaApp.controller('recoveryController', ['$scope', '$window', '$location', '$timeout', 'userService',  
function ($scope, $window, $location, $timeout, userService) {

	$scope.pageClass = 'page-standard';

	$scope.error = null;
	$scope.success = null;
	
	$scope.recovery = function () {

		userService.recoveryPassword(function (response) {

			$scope.success = 'A mail has been sent it with instructions for reset your password';
			$timeout(function () { 

				$location.path('reset'); 
			}, 2000);
			
		}, 
		function () {

			$scope.error = 'Failed on recover password.';
			console.log($scope.error);
		},
		$scope.user);
	}
}]);
