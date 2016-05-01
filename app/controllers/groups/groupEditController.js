alinaApp.controller('groupEditController', function ($scope, $routeParams, $location, groupService) {

	$scope.pageClass = 'page-standard';

	groupService.getGroup(function(response) {

		$scope.group = response.data;
		$scope.group.resources = [];

		for(index in $scope.group.permissions) {

			$scope.group.resources.push(parseInt($scope.group.permissions[index].id));
		}

		groupService.getPermissions(function (response) {

			$scope.resources = response.data;
			var elementsToDrop = [];

			for(var cont = 0; cont < $scope.resources.length; cont++) {

				if(checkPermission($scope.resources[cont].name, $scope.group.permissions)) {

					elementsToDrop.push($scope.resources[cont].name);
				}
			}

			for(var contOut = 0; contOut < elementsToDrop.length; contOut++) {

				for(var contIn = 0; contIn < $scope.resources.length; contIn++) {
					
					if($scope.resources[contIn].name == elementsToDrop[contOut]) {
						
						$scope.resources.splice(contIn, 1);
					}
				}
			}

			jQuery('#listPerms , #groupPerms').sortable({
				connectWith: '.dragg-connected'
			}).disableSelection();

			jQuery('#listPerms').on('sortreceive', function (event, ui) {

				$scope.group.resources.splice(jQuery.inArray(ui.item[0].value, $scope.group.resources), 1);
				console.log($scope.group.resources);

				groupService.retrievePermission(
				function () {

					console.log('Resource detached.');
				}, 
				function () {

					console.log('Error on update.');
				}, 
				$scope.group.id, 
				ui.item[0].value);
			});
			
			jQuery('#groupPerms').on('sortreceive', function (event, ui) {

				$scope.group.resources.push(ui.item[0].value);
				console.log($scope.group.resources);

				groupService.givePermission(
			 	function () {

			 			console.log('Resource attached.');
			 	}, function () {

			 		console.log('Error on update.');
			 	}, 
			 	$scope.group.id, ui.item[0].value);
			});
		},
		function () {

			console.log('Failed to retrieve permissions');
		});

	},
	function () {

		console.log('Failed to retrieve group');
	}, 
	$routeParams.id);



	$scope.save = function () {

		groupService.updateGroup(
			function (response) {
				/*
					TO DO:
					We should catch the response.message and send it 
					to the user list on a flash message
					console.log(response.message);
				*/
				$location.path('groups');
			},
			function (response) {

				console.log(response.error);
			},
			$routeParams.id,
			$scope.group
		);
	};

	function checkPermission(permission, list) {

		for (var cont = 0; cont < list.length; cont++) {
	        
	        if (list[cont].name === permission) {
	            return true;
	        }
	    }
	    return false;
	}
});
