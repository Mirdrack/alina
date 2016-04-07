alinaApp.controller('userEditController', function ($scope, $routeParams, $location, userService, groupService) {

	$scope.pageClass = 'page-standard';

	userService.getUser(function (response) {

		$scope.user = response.data;
		$scope.user.groups = [];

		for(index in $scope.user.roles) {
			
			$scope.user.groups.push(parseInt($scope.user.roles[index].id));
		}

		groupService.getGroups(function (response) {

			$scope.groups = angular.copy(response.data);
			var elementsToDrop = [];

			for(var cont = 0; cont < $scope.groups.length; cont++) {

				if(checkRole($scope.groups[cont].name, $scope.user.roles)) {

					elementsToDrop.push($scope.groups[cont].name);
				}
			}

			for(var contOut = 0; contOut < elementsToDrop.length; contOut++) {

				for(var contIn = 0; contIn < $scope.groups.length; contIn++) {

					if($scope.groups[contIn].name == elementsToDrop[contOut])
						$scope.groups.splice(contIn, 1);
				}
			}

			jQuery('#userGroups , #availableGroups').sortable({
				
				connectWith: '.dragg-connected'
			}).disableSelection();
			
			jQuery('#availableGroups').on('sortreceive', function (event, ui) {

				$scope.user.groups.splice(jQuery.inArray(ui.item[0].value, $scope.user.groups), 1);
				console.log($scope.user.groups);

				userService.retrieveRole(
				function () {

					console.log('Role detached.');
				}, 
				function () {

					console.log('Error on update.');
				}, 
				$scope.user.id, 
				ui.item[0].value);
			});

			jQuery('#userGroups').on('sortreceive', function (event, ui) {

				$scope.user.groups.push(ui.item[0].value);

			 	userService.giveRole(
			 	function () {

			 			console.log('Role attached.');
			 	}, function () {

			 		console.log('Error on update.');
			 	}, 
			 	$scope.user.id, ui.item[0].value);

			});

		},
		function (response) {

			$scope.groupsError = response.error
		});
	},
	function (response) {

		console.log(response.error);

	}, 
	$routeParams.id);


	$scope.save = function () {

		$scope.user.roles = $scope.user.groups;
		console.log($scope.user);
		userService.updateUser(function (response) 
		{
			/*
				TO DO:
				We should catch the response.message and send it 
				to the user list on a flash message
				console.log(response.message);
			*/
			$location.path('users');
		},
		function (response) {

			$scope.error = response.error;
		},
		$routeParams.id,
		$scope.user);
	}

	function checkRole(role, list) {

		for (cont = 0; cont < list.length; cont++) {
	        
	        if (list[cont].name === role) {
	            return true;
	        }
	    }
	    return false;
	}

});
