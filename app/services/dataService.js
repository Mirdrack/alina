alinaApp.factory('dataService', ['$http', 'urls', function ($http, urls) {

	return {

		getRestrictedData: function(succes, error) {

			$http.get(urls.BASE + '/restricted').success(success).error(error);
		}
	};
}]);