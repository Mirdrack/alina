alinaApp.controller('sessionController', ['$scope', 'authService' ,function ($scope, authService) {

	succesAuth = function (response)
	{
		console.log('succesAuth');
	};

	$scope.signup = function () {

		console.log('signup controller');
		authService.signup({'dato' : ' 1'}, succesAuth, function () {

			console.log('failed');
		});
	};

	$scope.signin = function () {
		console.log('signin');
	};

	$scope.message = 'sessionController';
}]);