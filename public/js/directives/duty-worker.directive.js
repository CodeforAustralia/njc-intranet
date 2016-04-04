(function(){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  angular.module('njcIntranetApp')
    .directive('njcDutyWorker', function($log){
      return {
        restrict: "EA", // element or attribute only
        replace: true, // replace the element
        templateUrl: 'js/partials/duty-worker.directive.html',
        scope: {
          dutyWorker: '='
        },
        link: function(scope, elem, attrs){
          $log.log("Duty worker directive");
          $log.log(scope.dutyWorker);
        }
      };
    });

})();
