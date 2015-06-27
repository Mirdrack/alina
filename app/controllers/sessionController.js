alinaApp.controller('sessionController', ['$scope', 'authService' ,function ($scope, authService) {

	succesAuth = function (response)
	{
		console.log('succesAuth');
	};

	$scope.signup = function () {

		var formData = {
			email: $scope.email,
			password: $scope.password
		};
		authService.signup(formData, succesAuth, function () {

			console.log('Failed to signup.');
			//$rootScope.error = 'Failed to signup.';
		});
	};

	$scope.signin = function () {

		var formData = {
			email: $scope.email,
			password: $scope.password
		};
		authService.signin(formData, succesAuth, function () {

			console.log('Invalid credentials.');
			//$rootScope.error = 'Invalid credentials.';
		});
	};

}]);