module.exports = function(app){
'use strict';

  /*@ngInject*/
  app.factory('AuthInterceptor', function($log, $window, TokenService){
    $log.log("INTERCEPTOR");
    $log.log(this);
    return {
      // interceptor for http requests
      request: function(config){
        // add the token to all requests
        var token = TokenService.get();
        if(token) {
          config.headers.Authorization = 'Bearer ' + token;
        }

        return config;
      },

      // interceptor for http responses
      response: function(res){
        // check that we have token in the response

        if(res.data.token) {
          TokenService.save(res.data.token);
        }

        return res;
      },

      // request errors
      requestError: function (rejection) {
       // console.log(rejection); // Contains the data about the error on the request.
       $log.log("REQUEST ERROR INTERCEPTOR");
       $log.log(rejection);

       // Return the promise rejection.
       return $q.reject(rejection);
      },

      // response errors
      responseError: function(response) {
        $log.log("RESPONSE ERROR INTERCEPTOR");
        $log.log(response);

        if (response.status === 401 || response.status === 403) {
          $log.log("Not authorized");
          $window.location.href = "/#/login";
        }
      }
    };
  });

};
