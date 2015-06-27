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

			console.log('failed');
		});
	};

	$scope.signin = function () {

		var formData = {
			email: $scope.email,
			password: $scope.password
		};
		console.log(formData);
	};

}]);