alinaApp.factory('groupService', ['$http', 'urls', '$window', function ($http, urls, $window) {

	
	return {
		createGroup: function (data, success, error) {
			
			$http.post(urls.BASE + '/role', data).success(success).error(error);
		},
		getGroup: function (success, error, id) {
			
			$http.get(urls.BASE + '/role/' + id).success(success).error(error);
		},
		getGroups: function(success, error) {
			
			$http.get(urls.BASE + '/role').success(success).error(error);
		},
		updateGroup: function (success, error, id, data) {

			$http.put(urls.BASE + '/role/' + id, data).success(success).error(error);
		},
		deleteGroup: function (success, error, id) {
			
			$http.delete(urls.BASE + '/role/' + id).success(success).error(error);
		},
		givePermission: function (success, error, roleid, permissionid) {

			$http.get(urls.BASE + '/role/give-permission/' + roleid + '/' + permissionid).success(success).error(error);
		},
		retrievePermission: function (success, error, roleid, permissionid) {

			$http.get(urls.BASE + '/role/retrieve-permission/' + roleid + '/' + permissionid).success(success).error(error);
		},
		getPermissions: function () {
			
		}
	};

}]);