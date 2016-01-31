alinaApp.factory('reportService', ['$http', 'urls', function ($http, urls) {

	return {

		getChartValues: function(success, error, data) {

			$http.post(urls.BASE + '/chart/generate', data).success(success).error(error);
		},
		
	};
}]);