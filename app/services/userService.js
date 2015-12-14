alinaApp.factory('userService', ['$http', 'urls', '$window', function ($http, urls, $window) {

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
	};
}]);