alinaApp.config(function ($routeProvider, $httpProvider) {

	$routeProvider
		.when('/', {
			templateUrl: 'pages/home.html',
			controller: 'mainController'
		})
		.when('/home', {
			templateUrl: 'pages/home.html',
			controller: 'mainController'
		})
		.when('/about', {
			templateUrl: 'pages/about.html',
			controller: 'aboutController'
		})
		.when('/signup', {
			templateUrl: 'pages/signup.html',
			controller: 'sessionController'
		})
		.when('/signin', {
			templateUrl: 'pages/signin.html',
			controller: 'sessionController'
		})
		.when('/profile', {
			templateUrl: 'pages/users/profile.html',
			controller: 'profileController'
		})
		;

		$httpProvider.interceptors.push(['$q', '$location', '$window', function ($q, $location, $window) {

			return {
				'request': function (config) {

					config.headers = config.headers || {};
					if($window.localStorage['token']) {
						config.headers.Authorization = 'Bearer ' + $window.localStorage['token'];
					}
					return config;
				},

				'responseError': function (response) {

					if(response.status == 401 || response.status == 403) {
						$location.path('/signin');
					}
					return $q.reject(response);
				}
			};
		}]);

})
.constant('urls', {
	BASE: 'http://rea.app',
	BASE_API: 'http://api.rea.app/v1'
})
.run(function ($rootScope, $location, $window) {
	$rootScope.$on('$routeChangeStart', function (event, next) {
		if($window.localStorage['token'] == null) {
			$location.path('/signin');
		}
	});

});