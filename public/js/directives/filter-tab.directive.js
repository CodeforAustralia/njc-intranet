(function(){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  angular.module('njcIntranetApp')
    .directive('filterTabs', function($log){
      return {
        restrict: "EA", // element or attribute only
        replace: true, // replace the element
        templateUrl: 'js/partials/filter-tab.directive.html',
        scope: {
          'tabs': '='
        },
        link: function(scope, elem, attrs){
          $log.log("Filter tabs directive");
          $log.log(scope);
          $log.log(elem);
          $log.log(attrs);
        }
      };
    });

})();
