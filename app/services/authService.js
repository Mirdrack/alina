alinaApp.factory('authService', ['$http', 'urls', '$window', function ($http, urls, $window) {

	function urlBase64Decode(str) {
		var output = str.replace('-', '+').replace('_', '/');
		switch (output.length % 4) {
			case 0:
				break;
			case 2:
				output += '==';
				break;
			case 3:
				output += '=';
				break;
			default:
				throw 'Illegal base64url string!';
           }
		return window.atob(output);
	}

	function getClaimsFromToken() {
		
		var token = $window.localStorage['token'];
		var user = {};
		if (typeof token !== 'undefined') {
			var encoded = token.split('.')[1];
			user = JSON.parse(urlBase64Decode(encoded));
		}
		return user;
	}


	var tokenClaims = getClaimsFromToken();

	return {
		signup: function (data, success, error) {
			console.log(data);
			$http.post(urls.BASE + '/signup', data).success(success).error(error);
		},
		signin: function (data, success, error) {
			console.log(data);
			$http.post(urls.BASE + '/login', data).success(success).error(error);
		},
		logout: function(success) {
			tokenClaims = {};
			$window.localStorage.removeItem('token');
			success();
		},
		getTokenClaims: function () {
			return tokenClaims;
		}
	};

}]);