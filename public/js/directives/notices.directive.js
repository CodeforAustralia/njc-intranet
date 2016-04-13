(function(){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  angular.module('njcIntranetApp')
    .directive('njcNotices', function($log, $interval){
      return {
        restrict: "EA", // element or attribute only
        replace: true, // replace the element
        templateUrl: '/intranet-static/js/partials/notices.directive.html',
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

})();
