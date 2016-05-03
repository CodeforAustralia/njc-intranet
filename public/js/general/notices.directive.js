module.exports = function(app){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  app.directive('njcNotices', function($log, $interval, Constants){
      return {
        restrict: "EA", // element or attribute only
        replace: true, // replace the element
        template: require('./notices.directive.html'),
        scope: {
          notices: '='
        },
        link: function(scope, elem, attrs){
          $log.log("Notices directive");
          scope.tickInterval = 1000;
          scope.clock = Date.now();

          // Start the clock
          $interval(function(){
            scope.clock = Date.now();
          }, scope.tickInterval);
        }
      };
    });

};
