alinaApp.factory('dataService', ['$http', 'urls', '$window', function ($http, urls, $window) {

	return {

		getRestrictedData: function(success, error) {

			var token = $window.localStorage['token'];
			$http.get(urls.BASE + '/restricted?token='+token).success(success).error(error);
		}
	};
}]);