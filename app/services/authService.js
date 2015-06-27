alinaApp.factory('authService', ['$http', 'urls', function ($http, urls) {

	return {

		signup: function (data, success, error) {
			console.log(data);
			//$http.post(urls.BASE + '/signup', data).success(success).error(error);
		},
		signin: function (data, success, error) {
			console.log(data);
			//http.post(urls.BASE + '/signin', data).success(success).error(error);
		}
	};

}]);