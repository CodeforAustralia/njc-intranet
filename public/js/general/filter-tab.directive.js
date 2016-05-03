module.exports = function(app){
  'use strict';
  // App bootstrapping + DI
  /*@ngInject*/
  app.directive('filterTabs', function($log, Constants){
      return {
        restrict: "EA", // element or attribute only
        replace: true, // replace the element
        templateUrl: Constants.urls.public+'/js/partials/filter-tab.directive.html',
        scope: {
          'tabs': '=',
          'active': '=',
          'key': '@',
          'default': "@"
        },
        link: function(scope, elem, attrs){
          $log.log("Filter tabs directive");
          $log.log(scope);
          $log.log(elem);
          $log.log(attrs);

          // set the default tab
          scope.active = scope.default;
          scope.key = scope.key;

          // handles updating the current active tab
          scope.updateActiveTab = function(tab){
            var k = scope.key;
            var ak = _.findKey(scope.tabs, {"active":"active"});
            //var nk = _.findKey(scope.tabs, {k: tab[k]});
            scope.tabs[ak].active = "";
            tab.active = "active";
            scope.active = tab.value;
          };
        }
      };
    });

};
