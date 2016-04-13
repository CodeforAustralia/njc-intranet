(function(){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  angular.module('njcIntranetApp')
    .directive('njcUpdateInOutStatus', function($log){
      return {
        restrict: "EA", // element or attribute only
        replace: true, // replace the element
        templateUrl: '/intranet-static/js/partials/update-in-out-status.directive.html',
        scope: {

        },
        link: function(scope, elem, attrs){
          $log.log("Update in out status directive");

        }
      };
    });

})();
