module.exports = function(app){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  app.directive('eventsCards', function($log){
    return {
      restrict: "EA", // element or attribute only
      replace: true, // replace the element
      template: require('./events-cards.directive.html'),
      scope: {
        events: '='
      },
      link: function(scope, elem, attrs){
        $log.log("Events cards directive");

      }
    };
  });

};
