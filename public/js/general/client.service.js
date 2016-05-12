module.exports = function(app){
'use strict';

  /*@ngInject*/
  app.factory('ClientService', function($log, $state, SessionService, AuthService){

    var client = null;

    function cacheClient(_client){
      //SessionService.cache('client', _client);
      var curr = { logged_in: true};
      client = _client;
      $log.log("CACHE CLIENT");
      $log.log(client);
      //SessionService.cache('client', curr);
      SessionService.cache('client', client);
    }

    function fetchClientFromCache(){
      client = SessionService.get('client');
      $log.log("Fetching client from cache");
      $log.log(client);
      return client;
    }

    return {
      isLoggedIn: function(){
        $log.log("is logged in");
        $log.log(client);
        return !_.isNull(client);
      },
      clear: function(){
        $log.log("Clearing the session");
        SessionService.clear('client');
        client = null;
      },
      set: function(_client){
        $log.log("CACHING THE CLIENT");
        cacheClient(_client);
      },
  		fetch: fetchClientFromCache,
      get: function(){
        return client;
      }
    };

  });

};
