module.exports = function(app){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  app.directive('dutyWorkerCard', function($log){
    return {
      restrict: "EA", // element or attribute only
      replace: true, // replace the element
      template: require('./duty-worker-card.directive.html'),
      scope: {
        worker: '='
      },
      link: function(scope, elem, attrs){
        $log.log("duty worker card directive");

      }
    };
  });

};
