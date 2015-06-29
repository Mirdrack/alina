var alinaApp = angular.module('alinaApp', ['ngRoute', 'ngAnimate', 'ngStorage']);

alinaApp.config(function ($routeProvider, $httpProvider) {

	$routeProvider
		.when('/', {
			templateUrl : 'pages/home.html',
			controller : 'mainController'
		})
		.when('/home', {
			templateUrl : 'pages/home.html',
			controller : 'mainController'
		})
		.when('/about', {
			templateUrl : 'pages/about.html',
			controller : 'aboutController'
		})
		.when('/contact', {
			templateUrl : 'pages/contact.html',
			controller : 'contactController'
		})
		.when('/signup', {
			templateUrl : 'pages/signup.html',
			controller : 'sessionController'
		})
		.when('/signin', {
			templateUrl : 'pages/signin.html',
			controller : 'sessionController'
		})
		.when('/restricted', {
			templateUrl: 'partials/restricted.html',
			controller: 'restrictedController'
		});

		$httpProvider.interceptors.push(['$q', '$location', '$localStorage', function ($q, $location, $localStorage) {

			return {
				'request': function (config) {

					config.headers = config.headers || {};
					if($localStorage.token) {
						config.headers.Authorization = 'Bearer ' + localStorage.token;
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
.run(function ($rootScope, $location, $localStorage) {

	$rootScope.$on('$routeChangeStart', function (event, next) {

		if($localStorage.token == null) {
			if(next.templateUrl === 'partials/restricted.html') {
				$location.path('/signup');
			}
		}
	});

});

alinaApp.controller('mainController', function ($scope) {

	$scope.message = 'This is home page';
	$scope.pageClass = 'page-home';
});

alinaApp.controller('aboutController', function ($scope) {

	$scope.message = 'Contact page';
	$scope.pageClass = 'page-about';
});

alinaApp.controller('contactController', function ($scope) {

	$scope.message = 'The contact';
	$scope.pageClass = 'page-contact';
});

