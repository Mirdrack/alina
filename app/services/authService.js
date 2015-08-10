alinaApp.factory('authService', ['$http', 'urls', '$window', function ($http, urls, $window) {

	var tokenClaims = {};

	return {
		signup: function (data, success, error) {
			console.log(data);
			$http.post(urls.BASE + '/signup', data).success(success).error(error);
		},
		signin: function (data, success, error) {
			console.log(data);
			$http.post(urls.BASE + '/login', data).success(success).error(error);
		},
		logout: function(success) {
			tokenClaims = {};
			$window.localStorage.removeItem('token');
			success();
		}
	};

}]);