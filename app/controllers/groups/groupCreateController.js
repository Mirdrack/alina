alinaApp.controller('groupCreateController',function ($scope, $rootScope, $location, groupService) {

	$scope.pageClass = 'page-standard';

	groupService.getPermissions(
		function (response) {

			$scope.permissions = response.data;
			$scope.basicperm = [];
			$scope.basicperm.push($scope.permissions[5]);
			$scope.basicperm.push($scope.permissions[8]);
			$scope.permissions.splice(5,1);
			$scope.permissions.splice(8,1);

			$('#listPerms , #basicPerms').sortable({
				connectWith: '.dragg-connected'
			}).disableSelection();
		},
		function (response) {

			$scope.error = response.error;
		}
	);

	$scope.create = function (id) {

		groupService.createGroup($scope.group,
			function (response){

				$location.path('/groups');
			},
			function (response){
				
				$rootScope.error = response.error;
				if($rootScope.error == 'Invalid fields'){
					$('#alGroup').show();
				}
			}
		);
	};

});