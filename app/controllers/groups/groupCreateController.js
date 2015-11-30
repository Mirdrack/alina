alinaApp.controller('groupCreateController',function ($scope, $rootScope, $location, groupService) {

	$scope.pageClass = 'page-standard';

	$scope.create = function (id) {

		var nGroup = {
			name:$scope.groupName,
			label:$scope.groupLabel
		};
		groupService.createGroup(nGroup,
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