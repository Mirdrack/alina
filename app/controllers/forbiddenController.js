alinaApp.controller('forbiddenController', ['$scope', '$location', '$timeout',  
function ($scope, $location, $timeout) {

	$scope.pageClass = 'page-standard';

	$timeout(function () { 

		$location.path('/'); 
	}, 2000);
}]);
