module.exports = function(app){
'use strict';

  /*@ngInject*/
  app.factory('SessionService', function($log, $base64, localStorageService){

    var init = function(){
      $log.log("SessionService init");
    };

    var cache = function(key, data){
      var encoded = $base64.encode(JSON.stringify(data));
      localStorageService.set(key, encoded);
    };

    var retrieve = function(key){
      var data = localStorageService.get(key);
      if (!_.isEmpty(data) && !_.isUndefined(data) && !_.isNull(data)){
        return JSON.parse($base64.decode(data));
      }
      return null;
    };

    var uncache = function(key){
      $log.log("Clearing cache for - " + key);
      localStorageService.remove(key);
    };

    init();

  	return {
  	   get: function(key){
         return retrieve(key);
       },

       cache: function(key, data){
         cache(key, data);
       },

       clear: function(key){
         uncache(key);
       }
  	};

  });

};
