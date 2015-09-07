alinaApp.controller('userCreateController', function ($scope, userService) {

	$scope.pageClass = 'page-contact';

	$scope.create = function () {

		console.log('Lets create the user');
		console.log('We should call to the userService');
	};
});