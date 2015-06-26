alinaApp.factory('authFactory', ['$http', 'urls', function ($http, urls) {

	return {

		signup : function (data, success, error) {
			console.log('hola signup');
			//$http.post(urls.BASE + '/signup', data).success(success).error(error);
		}
	};

}]);