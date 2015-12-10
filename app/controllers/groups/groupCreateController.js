alinaApp.controller('groupCreateController',function ($scope, $rootScope, $location, groupService) {

	$scope.pageClass = 'page-standard';

	groupService.getPermissions(
		function (response) {
			$scope.group = {permissions: []};
			$scope.permissions = response.data;
			$scope.basicperm = [];
			$scope.basicperm.push($scope.permissions[5]);
			$scope.basicperm.push($scope.permissions[8]);
			$scope.group.permissions.push($scope.permissions[5].id);
			$scope.group.permissions.push($scope.permissions[8].id);
			$scope.permissions.splice(5,1);
			$scope.permissions.splice(8,1);

			jQuery('#listPerms , #groupPerms').sortable({
				connectWith: '.dragg-connected'
			}).disableSelection();
			jQuery('#listPerms').on('sortreceive', function (event, ui) {

				$scope.group.permissions.splice(jQuery.inArray(ui.item[0].value, $scope.group.permissions), 1);
				console.log($scope.group.permissions);
			});
			jQuery('#groupPerms').on('sortreceive', function (event, ui) {

				$scope.group.permissions.push(ui.item[0].value);
				console.log($scope.group.permissions);
			});
		},
		function (response) {

			$scope.error = response.error;
		}
	);

	$scope.create = function (id) {

		groupService.createGroup($scope.group,
			function (response){

				/*
				The API doesnt add the permissions
				*/
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
