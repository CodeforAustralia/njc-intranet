module.exports = function(app){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  app.directive('njcDutyWorker', function($log){
      return {
        restrict: "EA", // element or attribute only
        replace: true, // replace the element
        template: require('./duty-worker.directive.html'),
        scope: {
          dutyWorker: '='
        },
        link: function(scope, elem, attrs){
          $log.log("Duty worker directive");
          $log.log(scope);
          $log.log(scope.dutyWorker);
        }
      };
    });

};