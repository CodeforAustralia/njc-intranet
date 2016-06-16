module.exports = function(app){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  app.directive('dutyWorker', function($log){
    return {
      restrict: "EA", // element or attribute only
      replace: true, // replace the element
      template: require('./duty-worker.directive.html'),
      scope: {
        worker: '='
      },
      link: function(scope, elem, attrs){
        $log.log("duty worker directive");

      }
    };
  });

};
