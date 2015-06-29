alinaApp.controller('sessionController', ['$scope', '$rootScope', '$localStorage', 'authService' , 
function ($scope, $rootScope, $localStorage, authService) {

	succesAuth = function (response)
	{
		console.log('succesAuth');
		$localStorage.token = response.token;
        window.location = '/';
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
			console.log(response);
			$rootScope.error = 'Invalid credentials.';
		});
	};

	$scope.logout = function () {

		authService.logout(function () {
			window.location = '/'
		});
	};

}]);