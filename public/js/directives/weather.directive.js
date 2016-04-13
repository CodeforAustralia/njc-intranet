(function(){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  angular.module('njcIntranetApp')
    .directive('njcWeather', function($log){
      return {
        restrict: "EA", // element or attribute only
        replace: true, // replace the element
        templateUrl: '/intranet-static/js/partials/weather.directive.html',
        scope: {

        },
        link: function(scope, elem, attrs){
          $log.log("Weather directive");

        }
      };
    });

})();
