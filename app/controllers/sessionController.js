alinaApp.controller('sessionController', ['$scope', '$rootScope', 'authService' , '$window', 
function ($scope, $rootScope, authService, $window) {

	$scope.pageClass = 'page-standard';
	
	succesAuth = function (response) {

		$window.localStorage['token'] = response.token;
        $window.location = '/';
	};

	$scope.signup = function () {

		var formData = {
			email: $scope.email,
			password: $scope.password
		};
		authService.signup(formData, succesAuth, function () {

			console.log('Failed to signup.');
			$rootScope.error = 'Failed to signup.';
		});
	};

	$scope.signin = function () {

		var formData = {
			email: $scope.email,
			password: $scope.password
		};
		authService.signin(formData, succesAuth, function (response) {

			console.log('Invalid credentials.');
			$rootScope.error = 'Invalid credentials.';
		});
	};

	// $scope.logout = function () {
	// 	console.log('Get out');
	// 	authService.logout(function () {
	// 		window.location = '/';
	// 	});
	// };
	$scope.token = $window.localStorage['token'];
	// $scope.tokenClaims = authService.getTokenClaims();

}]);