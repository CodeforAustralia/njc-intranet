module.exports = function(app){
'use strict';

  /*@ngInject*/
  app.factory('FeedbackService', function($log, $http){
  	return {
      all: function(){
        return $http.get("/api/feedback");
      },
      create: function(feedback){
        return $http.post("/api/feedback", feedback);
      }
  	};
  });

};
