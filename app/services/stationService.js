alinaApp.factory('stationService', ['$http', 'urls', '$window', function ($http, urls, $window) {

	
	return {
		getStation: function (success, error, id) {
			
			$http.get(urls.BASE + '/station/' + id).success(success).error(error);
		}
	};

}]);