alinaApp.factory('stationSensorService', ['$http', 'urls', '$window', function ($http, urls, $window) {

	
	return {
		getSensorList: function (success, error) {

			$http.get(urls.BASE + '/station-sensor').success(success).error(error);
		},
		getSensor: function(success, error, id) {

			$http.get(urls.BASE + '/station-sensor/' + id).success(success).error(error);
		},
		updateSensor: function(success, error, id, data) {

			$http.put(urls.BASE + '/station-sensor/' + id, data).success(success).error(error);
		},
	};

}]);