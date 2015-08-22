alinaApp.factory('userService', ['$http', 'urls', '$window', function ($http, urls, $window) {

	return {

		getUsers: function(success, error) {

			$http.get(urls.BASE + '/user?token='+token).success(success).error(error);
		},

		getProfile: function(success, error) {

			$http.get(urls.BASE + '/user/profile?token='+token).success(success).error(error);
		}
	};
}]);