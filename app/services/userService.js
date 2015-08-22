alinaApp.factory('userService', ['$http', 'urls', '$window', function ($http, urls, $window) {



	return {

		getUsers: function(success, error) {
			$http.get(urls.BASE + '/user').success(success).error(error);
		},

		getProfile: function(success, error) {

			$http.get(urls.BASE + '/user/profile').success(success).error(error);
		}
	};
}]);