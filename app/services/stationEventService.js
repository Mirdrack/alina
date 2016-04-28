alinaApp.factory('stationEventService', ['$http', 'urls', function ($http, urls) {

	
	return {
		getStationEventsList: function (success, error, page, filter) {

			if(page != null) {

				var url = urls.BASE + '/station-event?page=' + page;
				if(filter != null)
					url += '&filter=' + filter;
			}
			else {

				var url = urls.BASE + '/station-event';
				if(filter != null)
					url += '?filter=' + filter;
			}
			$http.get(url).success(success).error(error);
		}
	};

}]);