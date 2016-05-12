module.exports = function(app){
'use strict';

	// Authentication service, returns a resource
	/*@ngInject*/
	app.service('AuthService', function($log, $http, $sanitize, AlertService){
		var loggedIn = false;

		return {
			isAuthenticated: function(){
				return loggedIn;
			},

			attempt: function(username, password){
				var credentials = {
					username: $sanitize(username),
					password: $sanitize(password)
				};

				return $http.post('/api/auth/login', credentials);
			},

			logout: function(){
				return $http.get('/auth/logout').then(function(){
					loggedIn = false;
				});
			}
		};
	});

};
