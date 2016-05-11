module.exports = function(app){
'use strict';

	// Authentication service, returns a resource
	/*@ngInject*/
	app.service('AuthService', function($log, $state, $http, $sanitize, AlertService){
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

				$http.post('/auth/login', credentials).then(function(){
					loggedIn = true;
					$log.log("Go to dashboard");
					$state.go('app.dashboard');
				}, function(err){
					$log.log(err);

					if (err.status === 401){
						AlertService.error("Incorrect username / password");
					}
				});
			},

			logout: function(){
				return $http.get('/auth/logout').then(function(){
					loggedIn = false;
				});
			}
		};
	});

};
