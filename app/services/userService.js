alinaApp.factory('userService', ['$http', 'urls', '$window', '$timeout', function ($http, urls, $window, $timeout) {

	return {

		getUsers: function(success, error) {

			$http.get(urls.BASE + '/user').success(success).error(error);
		},
		getProfile: function(success, error) {

			$http.get(urls.BASE + '/user/profile').success(success).error(error);
		},
		getUser: function(success, error, id) {

			$http.get(urls.BASE + '/user/' + id).success(success).error(error);
		},
		updateUser: function(success, error, id, data) {

			$http.put(urls.BASE + '/user/' + id, data).success(success).error(error);
		},
		createUser: function(success, error, data) {

			$http.post(urls.BASE + '/user', data).success(success).error(error);
		},
		deleteUser: function (success, error, id) {
			
			$http.delete(urls.BASE + '/user/' + id).success(success).error(error);
		},
		giveRole: function (success, error, userId, roleId) {

			$http.post(urls.BASE + '/user/give-role/' + userId + '/' + roleId).success(success).error(error);
		},
		retrieveRole: function (success, error, userId, roleId) {

			$http.post(urls.BASE + '/user/retrieve-role/' + userId + '/' + roleId).success(success).error(error);
		},
		checkPermissions: function (success, error) {

			var permissions = {
				permissions: [
					'users', 
					'groups', 
					'view_stations', 
					'alarms_stations', 
					'events_stations', 
					'station_sensors',
				], 
			}
			$http.post(urls.BASE + '/user/check-permissions', permissions).success(success).error(error);
		},
		updatePassword: function(success, error, data) {

			$http.post(urls.BASE + '/user/change-password', data).success(success).error(error);
		},
		recoveryPassword: function(success, error, data) {

			$http.post(urls.BASE + '/password/recovery', data).success(success).error(error);
		},
		resetPassword: function(success, error, data) {

			$http.post(urls.BASE + '/password/reset', data).success(success).error(error);
		},
	};
}]);