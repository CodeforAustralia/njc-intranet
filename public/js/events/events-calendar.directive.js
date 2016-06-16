module.exports = function(app){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  app.directive('eventsCalendar', function($log){
    return {
      restrict: "EA", // element or attribute only
      replace: true, // replace the element
      template: require('./events-calendar.directive.html'),
      scope: {
        events: '='
      },
      link: function(scope, elem, attrs){
        $log.log("Events calendar directive");

      }
    };
  });

};
