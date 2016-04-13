alinaApp.factory('stationService', ['$http', 'urls', '$window', function ($http, urls, $window) {

	
	return {
		getStationsList: function (success, error) {

			$http.get(urls.BASE + '/station/basic-list').success(success).error(error);
		},
		getStations: function (success, error) {

			$http.get(urls.BASE + '/station').success(success).error(error);
		},
		getStation: function (success, error, id) {
			
			$http.get(urls.BASE + '/station/' + id).success(success).error(error);
		},
		updateStation: function(success, error, id, data) {

			$http.put(urls.BASE + '/station/' + id, data).success(success).error(error);
		},
		turnOn: function(success, error, id) {

			$http.post(urls.BASE + '/station/turn-on', { 'id': id }).success(success).error(error);
		}
	};

}]);