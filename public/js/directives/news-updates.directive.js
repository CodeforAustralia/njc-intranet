(function(){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  angular.module('njcIntranetApp')
    .directive('njcNewsUpdates', function($log){
      return {
        restrict: "EA", // element or attribute only
        replace: true, // replace the element
        templateUrl: '/intranet-static/js/partials/news-updates.directive.html',
        scope: {
          news: '='
        },
        link: function(scope, elem, attrs){
          $log.log("News updates directive");
          $log.log(scope);
        }
      };
    });

})();
