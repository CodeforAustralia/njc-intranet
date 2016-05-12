module.exports = function(app){
'use strict';

  /*@ngInject*/
  app.factory('FeedbackService', function($log, $http){
  	return {
      create: function(feedback){
        return $http.post("/api/feedback", feedback);
      }
  	};
  });

};
