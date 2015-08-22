alinaApp.factory('userService', ['$http', 'urls', '$window', function ($http, urls, $window) {

	return {

		getProfile: function(success, error) {

			$http.get(urls.BASE + '/user/profile?token='+token).success(success).error(error);
		}
	};
}]);