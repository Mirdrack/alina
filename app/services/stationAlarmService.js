alinaApp.factory('stationAlarmService', ['$http', 'urls', function ($http, urls) {

	
	return {
		getStationAlarmsList: function (success, error, page) {

			if(page != null)
				var url = urls.BASE + '/station-alarm?page=' + page;
			else
				var url = urls.BASE + '/station-alarm';
			$http.get(url).success(success).error(error);
		}
	};

}]);