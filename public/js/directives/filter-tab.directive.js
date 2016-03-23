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
          'tabs': '=',
          'active': '=',
          'default': "@"
        },
        link: function(scope, elem, attrs){
          $log.log("Filter tabs directive");
          $log.log(scope);
          $log.log(elem);
          $log.log(attrs);

          // set the default tab
          scope.active = scope.default;

          // handles updating the current active tab
          scope.updateActiveTab = function(tab){
            var ak = _.findKey(scope.tabs, {"active":"active"});
            var nk = _.findKey(scope.tabs, {"label": tab.label});
            scope.tabs[ak].active = "";
            scope.tabs[nk].active = "active";
            scope.active = tab.value;
            $log.log(tab.value);
          };
        }
      };
    });

})();
