module.exports = function(app){
'use strict';

	// Token service, saves / returns a token
	/*@ngInject*/
	app.service('TokenService', function($log, $window, SessionService){
		function parseToken(token){
			// parse the token
			var base64url = token.split('.')[1];
			var base64 = base64url.replace('-', '+').replace('_', '/');
			$log.log("PARSED TOKEN");
			$log.log(JSON.parse($window.atob(base64)));
			return JSON.parse($window.atob(base64));
		}

		function clearToken(){
			// clear the token
			SessionService.clear('jwt-token');
		}

		function saveToken(token){
			$log.log("Storing the token");
			SessionService.cache('jwt-token', token);
		}

		function getToken(){
			$log.log("Retrieving the token");
			return SessionService.get('jwt-token');
		}

    function checkAuth(){
			// check if the user is authenticated
			var token = getToken();
			if (token){
				var params = parseToken(token);
				/// check that it isnt expired
				return Math.round(new Date().getTime() / 1000) <= params.exp;
			}
			return false;
		}

		return {
      isAuthenticated: function(){
				return checkAuth();
			},
      save: saveToken,
      get: getToken,
      clear: clearToken
		};
	});

};
