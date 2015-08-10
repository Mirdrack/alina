alinaApp.factory('dataService', ['$http', 'urls', function ($http, urls) {

	return {

		getRestrictedData: function(success, error) {

			$http.get(urls.BASE + '/restricted').success(success).error(error);
		}
	};
}]);