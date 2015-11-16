alinaApp.controller('userCreateController', function ($scope, userService) {

	$scope.pageClass = 'page-standard';

	$scope.create = function () {

		console.log('Lets create the user');
		console.log('We should call to the userService');
	};
});