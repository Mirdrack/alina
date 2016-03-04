alinaApp.factory('stationEventService', ['$http', 'urls', function ($http, urls) {

	
	return {
		getStationEventsList: function (success, error, page) {

			if(page != null)
				var url = urls.BASE + '/station-event?page=' + page;
			else
				var url = urls.BASE + '/station-event';
			$http.get(url).success(success).error(error);
		}
	};

}]);