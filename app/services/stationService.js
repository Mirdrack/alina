alinaApp.factory('stationService', ['$http', 'urls', '$window', function ($http, urls, $window) {

	
	return {
		getStationsList: function(success, error) {
			$http.get(urls.BASE + '/station').success(success).error(error);
		},
		getStation: function (success, error, id) {
			
			$http.get(urls.BASE + '/station/' + id).success(success).error(error);
		}
	};

}]);