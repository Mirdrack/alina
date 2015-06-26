alinaApp.controller('sessionController', ['$scope', 'authFactory' ,function ($scope, authFactory) {

	succesAuth = function (response)
	{
		console.log('succesAuth');
	};

	$scope.signup = function () {

		console.log('signup controller');
		authFactory.signup({'dato' : ' 1'}, succesAuth, function () {

			console.log('failed');
		});
	};

	$scope.signin = function () {
		console.log('signin');
	};

	$scope.message = 'sessionController';
}]);