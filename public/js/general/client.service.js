module.exports = function(app){
'use strict';

  /*@ngInject*/
  app.factory('ClientService', function($log, SessionService){

    var client = null;

    function cacheClient(_client){
      $log.log("CACHE CLIENT");
      client = _client; // set the client obj
      SessionService.cache('client', _client);
    }

    function fetchClientFromCache(){
      client = SessionService.get('client') || null;
      $log.log("Fetching client from cache");
      $log.log(client);
      return client;
    }

    return {
      isLoggedIn: function(){
        $log.log("is logged in");
        //$log.log(client);
        var c = fetchClientFromCache();
        $log.log(c);
        return !_.isNull(c);
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
      isAdmin: function(){
        $log.log("Is the client an admin?");
        var client = this.get();
        if (!client) return false;
        return client.is_admin;
      },
  		fetch: fetchClientFromCache,
      get: function(){
        return client || fetchClientFromCache();
      }
    };

  });

};
