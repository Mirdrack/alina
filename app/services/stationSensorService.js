alinaApp.factory('stationSensorService', ['$http', 'urls', '$window', function ($http, urls, $window) {

	
	return {
		getSensorList: function (success, error) {

			$http.get(urls.BASE + '/station-sensor').success(success).error(error);
		},
	};

}]);