module.exports = function(app){
'use strict';

  /*@ngInject*/
  app.factory('FeedbackService', function($log, $http){
  	return {
      create: function(feedback){
        $http.post("/api/feedback", feedback);
      }
  	};
  });

};
