module.exports = function(app){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  app.directive('feedbackList', function($log){
    return {
      restrict: "EA", // element or attribute only
      replace: true, // replace the element
      template: require('./feedback-list.directive.html'),
      scope: {
        feedback: '=',
        canEdit: '='
      },
      link: function(scope, elem, attrs){
        $log.log("Feedback list directive");

      }
    };
  });

};
